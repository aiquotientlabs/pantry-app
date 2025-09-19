import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { Platform } from "react-native";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../firebaseConfig";

const db = getFirestore();

export function useRegisterFcmToken() {
  useEffect(() => {
    let unsubRefresh: (() => void) | undefined;

    (async () => {
      const user = auth.currentUser;
      if (!user) return; // only run when signed-in

      // Request notification permission (Android 13+/iOS)
      const status = await messaging().requestPermission();
      const enabled =
        status === messaging.AuthorizationStatus.AUTHORIZED ||
        status === messaging.AuthorizationStatus.PROVISIONAL;
      if (!enabled) return;

      // Get token and store as a doc ID under users/{uid}/fcmTokens/{token}
      const token = await messaging().getToken();
      if (token) {
        await setDoc(
          doc(db, "users", user.uid, "fcmTokens", token),
          { platform: Platform.OS, createdAt: serverTimestamp() },
          { merge: true }
        );
      }

      // Keep it fresh
      unsubRefresh = messaging().onTokenRefresh(async (t) => {
        const u = auth.currentUser;
        if (!u) return;
        await setDoc(
          doc(db, "users", u.uid, "fcmTokens", t),
          { platform: Platform.OS, createdAt: serverTimestamp() },
          { merge: true }
        );
      });
    })();

    return () => { if (unsubRefresh) unsubRefresh(); };
  }, []);
}
