import * as admin from "firebase-admin";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { onRequest } from "firebase-functions/v2/https";
import { onDocumentWritten } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";

admin.initializeApp();
const db = admin.firestore();

/** === CONFIG === */
const TIME_ZONE = "America/Phoenix"; // daily job runs at 09:00 in this TZ
const EXPIRY_HORIZON_DAYS = 3; // include items expiring today -> +3 days

/** Parse "MM/DD/YYYY" to a Firestore Timestamp at 23:59:59.999 UTC. */
function parseExpirationStringToTs(
  s: unknown
): admin.firestore.Timestamp | null {
  if (typeof s !== "string") return null;
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const mm = Number(m[1]);
  const dd = Number(m[2]);
  const yyyy = Number(m[3]);
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return null;
  const ms = Date.UTC(yyyy, mm - 1, dd, 23, 59, 59, 999);
  return admin.firestore.Timestamp.fromMillis(ms);
}

/**
 * Keep a derived `expirationTs` so we can range-query by date.
 * Triggers on create/update of inventory docs.
 */
export const normalizeInventoryOnWrite = onDocumentWritten(
  "inventory/{itemId}",
  async (event) => {
    const change = event.data;
    if (!change || !change.after.exists) return; // ignore deletes

    const after = change.after;
    const data = after.data() as Record<string, unknown>;

    if (!data.expirationTs && data.expiration) {
      const ts = parseExpirationStringToTs(data.expiration);
      if (ts) {
        await after.ref.set({ expirationTs: ts }, { merge: true });
        logger.info("Added expirationTs to inventory item", {
          itemId: after.id,
          uid: data?.uid,
          expiration: data.expiration,
        });
      }
    }
  }
);

/**
 * Core: find items expiring within the horizon, group by user,
 * send one notification per token, prune invalid tokens.
 */
async function notifyExpiringItemsCore() {
  const now = admin.firestore.Timestamp.now();
  const until = admin.firestore.Timestamp.fromMillis(
    now.toMillis() + EXPIRY_HORIZON_DAYS * 24 * 60 * 60 * 1000
  );

  const snap = await db
    .collection("inventory")
    .where("expirationTs", ">=", now)
    .where("expirationTs", "<=", until)
    .orderBy("expirationTs", "asc")
    .get();

  const perUser = new Map<
    string,
    Array<{ name: string; expiration: admin.firestore.Timestamp }>
  >();

  snap.forEach((doc) => {
    const x = doc.data() as Record<string, unknown>;
    const uid = x?.uid as string | undefined;
    if (!uid) return;

    const qty = Number(x?.quantity ?? 1);
    if (qty <= 0) return;

    const exp =
      (x?.expirationTs as admin.firestore.Timestamp | undefined) ??
      parseExpirationStringToTs(x?.expiration as unknown);
    if (!exp) return;

    const name = String(x?.name ?? "item");
    const list = perUser.get(uid) ?? [];
    list.push({ name, expiration: exp });
    perUser.set(uid, list);
  });

  for (const [uid, items] of perUser.entries()) {
    const tokensSnap = await db
      .collection("users")
      .doc(uid)
      .collection("fcmTokens")
      .get();

    if (tokensSnap.empty) {
      logger.debug("No FCM tokens for user; skipping", {
        uid,
        count: items.length,
      });
      continue;
    }

    const tokens = tokensSnap.docs.map((d) => d.id);

    const pretty = (t: admin.firestore.Timestamp) =>
      t
        .toDate()
        .toLocaleDateString("en-US", { month: "short", day: "numeric" });

    const body =
      items
        .slice(0, 3)
        .map((i) => `${i.name} (${pretty(i.expiration)})`)
        .join(", ") +
      (items.length > 3 ? ` +${items.length - 3} more` : "");

    let success = 0;
    const bad: string[] = [];

    for (const tok of tokens) {
      try {
        await admin.messaging().send({
          token: tok,
          notification: { title: "Items expiring soon", body },
          data: { type: "expiry", count: String(items.length) },
        });
        success++;
      } catch (err: unknown) {
        const anyErr = err as { errorInfo?: { code?: string }; code?: string };
        const code = anyErr?.errorInfo?.code || anyErr?.code;
        if (
          code === "messaging/registration-token-not-registered" ||
          code === "messaging/invalid-registration-token"
        ) {
          bad.push(tok);
        } else {
          logger.warn("FCM send failed", { uid, token: tok, code });
        }
      }
    }

    if (bad.length) {
      await Promise.all(
        bad.map((t) =>
          db.collection("users").doc(uid).collection("fcmTokens").doc(t).delete()
        )
      );
      logger.info("Pruned invalid FCM tokens", { uid, pruned: bad.length });
    }

    logger.info("User notifications sent", {
      uid,
      tried: tokens.length,
      success,
    });
  }

  logger.info("Expiry notifications processed", {
    usersNotified: perUser.size,
  });
}

/** Daily scheduler at 09:00 Phoenix time. */
export const notifyExpiringItemsDaily = onSchedule(
  
  { schedule: "every day 09:00", timeZone: TIME_ZONE },
  async () => {
    await notifyExpiringItemsCore();
  }
);

/** HTTP test endpoint to trigger the same logic during development. */
export const notifyExpiringItemsNow = onRequest(async (_req, res) => {
  try {
    await notifyExpiringItemsCore();
    res.status(200).send("OK");
  } catch (e) {
    logger.error("notifyExpiringItemsNow failed", e as Error);
    res.status(500).send("Error");
  }
});
