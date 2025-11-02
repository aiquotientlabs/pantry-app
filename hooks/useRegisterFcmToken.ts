// hooks/useRegisterFcmToken.ts  (final)
import { useEffect, useRef } from "react";
import messaging from "@react-native-firebase/messaging";
import { Platform, PermissionsAndroid } from "react-native";
import { auth, db } from "@/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

async function ensureNotifPermission() {
  if (Platform.OS === "android" && Number(Platform.Version) >= 33) {
    try {
      await PermissionsAndroid.request(
        "android.permission.POST_NOTIFICATIONS" as any
      );
    } catch {}
  }
}

export function useRegisterFcmToken() {
  const ran = useRef(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user || ran.current) return;
      ran.current = true;

      try {
        await ensureNotifPermission();
        await messaging().registerDeviceForRemoteMessages();

        const token = await messaging().getToken();
        if (!token) return;

        await setDoc(
          doc(db, "users", user.uid),
          { uid: user.uid, updatedAt: serverTimestamp() },
          { merge: true }
        );

        await setDoc(
          doc(db, "users", user.uid, "fcmTokens", token),
          { platform: Platform.OS, updatedAt: serverTimestamp() },
          { merge: true }
        );

        messaging().onTokenRefresh(async (t) => {
          await setDoc(
            doc(db, "users", user.uid, "fcmTokens", t),
            { platform: Platform.OS, updatedAt: serverTimestamp() },
            { merge: true }
          );
        });
      } catch (e) {
        console.warn("registerFcmToken failed", e);
      }
    });

    return () => unsub();
  }, []);
}
