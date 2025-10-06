// hooks/useRegisterFcmToken.ts
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { Platform } from "react-native";
import { auth, db } from "@/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export function useRegisterFcmToken() {
  useEffect(() => {
    let unsubRefresh: undefined | (() => void);

    (async () => {
      const user = auth.currentUser;
      if (!user) return;

      // 1) Ensure parent user doc exists so 'users' collection is visible
      await setDoc(
        doc(db, "users", user.uid),
        { uid: user.uid, updatedAt: serverTimestamp() },
        { merge: true }
      );

      // 2) Ask permission & get token
      try { await messaging().requestPermission(); } catch {}
      const token = await messaging().getToken().catch(() => null);

      if (token) {
        await setDoc(
          doc(db, "users", user.uid, "fcmTokens", token),
          { platform: Platform.OS, createdAt: serverTimestamp() },
          { merge: true }
        );
        console.log("Saved FCM token:", token);
      } else {
        console.log("No FCM token (permission/Play Services/emulator issue?)");
      }

      // 3) Keep token fresh
      unsubRefresh = messaging().onTokenRefresh(async (t) => {
        await setDoc(
          doc(db, "users", user.uid, "fcmTokens", t),
          { platform: Platform.OS, createdAt: serverTimestamp() },
          { merge: true }
        );
        console.log("Refreshed FCM token:", t);
      });
    })();

    return () => unsubRefresh?.();
  }, []);
}
