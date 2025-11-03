import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  type DocumentData,
  type Query,
} from "firebase/firestore";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, db } from "../firebaseConfig";

export function useShoppingList(threshold = 1) {
  const [items, setItems] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubFirestore: undefined | (() => void);
    const detachFirestore = () => {
      if (unsubFirestore) {
        unsubFirestore();
        unsubFirestore = undefined;
      }
    };

    const attachForUser = (user: User | null) => {
      if (!user) {
        // Signed out: clear and stop listening
        detachFirestore();
        setItems([]);
        setLoading(false);
        return;
      }

      const q: Query<DocumentData> = query(
        collection(db, "inventory"),
        where("uid", "==", user.uid),
        where("quantity", "<=", threshold)
      );

      unsubFirestore = onSnapshot(
        q,
        (snap) => {
          setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
          setLoading(false);
        },
        (err) => {
          console.warn("useShoppingList onSnapshot error:", err);
          setLoading(false);
        }
      );
    };

    // react to sign-in/sign-out
    setLoading(true);
    const authUnsub = onAuthStateChanged(auth, (user) => {
      detachFirestore();
      setLoading(true);
      attachForUser(user);
    });

    return () => {
      detachFirestore();
      authUnsub();
    };
  }, [threshold]);

  return { items, loading };
}
