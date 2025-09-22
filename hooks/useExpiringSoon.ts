import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { auth } from '@/firebaseConfig';

export function useExpiringSoon(days = 3) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) { setLoading(false); return; }

    const db = getFirestore();
    const now = Timestamp.now();
    const inN = Timestamp.fromMillis(now.toMillis() + days * 24 * 60 * 60 * 1000); //converts to milliseconds

    const q = query(
      collection(db, 'inventory'),
      where('uid', '==', user.uid),
      where('expirationTs', '>=', now),
      where('expirationTs', '<=', inN),
      orderBy('expirationTs', 'asc')
    );

    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false); //renders expiring list
    });

    return () => unsub();
  }, [days]);

  return { items, loading };
}