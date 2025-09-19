// hooks/useShoppingList.ts
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  DocumentData,
  Query,
} from "firebase/firestore";
import { auth } from "../firebaseConfig"; 
import { onAuthStateChanged, User } from "firebase/auth";

export function useShoppingList(threshold = 1) {
  const [items, setItems] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    let unsubFirestore: undefined | (() => void);
    let authUnsub: () => void;

    const attach = (user: User | null) => {
      // If no user, clear and stop
      if (!user) {
        setItems([]);
        setLoading(false);
        return;
      }

      const q: Query<DocumentData> = query(
        collection(db, "inventory"),
        where("uid", "==", user.uid),
        where("quantity", "<=", threshold)
        // no orderBy for qty at the moment
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
    authUnsub = onAuthStateChanged(auth, (user) => {
      // detach previous listener if threshold changes or user switches
      if (unsubFirestore) {
        unsubFirestore();
        unsubFirestore = undefined;
      }
      setLoading(true);
      attach(user);
    });

    return () => {
      if (unsubFirestore) unsubFirestore();
      authUnsub && authUnsub();
    };
  }, [threshold]);

  return { items, loading };
}
