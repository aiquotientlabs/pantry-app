// inventoryService.js
import { db, auth } from './firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

/**
 * Parse a user-entered date into a Firestore Timestamp.
 *  Supports:
 *   - "MM/DD/YYYY" (e.g., "10/08/2025") -> local midnight
 *   - ISO strings (e.g., "2025-10-08", "2025-10-08T00:00:00.000Z")
 *  Returns null if unparseable.
 */
function toExpirationTimestamp(expirationStr) {
  if (!expirationStr || typeof expirationStr !== 'string') return null;

  // MM/DD/YYYY?
  const mmddyyyy = expirationStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (mmddyyyy) {
    const [, mm, dd, yyyy] = mmddyyyy;
    const dt = new Date(Number(yyyy), Number(mm) - 1, Number(dd), 0, 0, 0);
    if (!isNaN(dt.getTime())) return Timestamp.fromDate(dt);
    return null;
  }

  // Try generic Date() parse (handles ISO-8601 safely if it's valid)
  const dt = new Date(expirationStr);
  if (!isNaN(dt.getTime())) return Timestamp.fromDate(dt);

  return null;
}

// CREATE
export const addInventoryItem = async (item) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const { expiration, ...rest } = item || {};
    const expirationTs = toExpirationTimestamp(expiration);

    const docRef = await addDoc(collection(db, 'inventory'), {
      ...rest,
      uid: user.uid,
      // Keep the display string if the user entered one
      expiration: expiration || '',
      // Add machine-friendly Timestamp if parseable
      ...(expirationTs ? { expirationTs } : {}),
      // Always store createdAtTs for auditing/tie-breaks
      createdAtTs: serverTimestamp(),
    });

    console.log('Item added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

// READ (current user’s items)
export const fetchInventoryItems = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const q = query(collection(db, 'inventory'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

// UPDATE — if caller changes `expiration` string, recompute `expirationTs`.
export const updateInventoryItem = async (itemId, updatedData) => {
  try {
    const { expiration, ...rest } = updatedData || {};
    const patch = { ...rest };

    if (typeof expiration !== 'undefined') {
      patch.expiration = expiration || '';
      const expirationTs = toExpirationTimestamp(expiration);
      if (expirationTs) {
        patch.expirationTs = expirationTs;
      } else {
        // If user cleared/invalidated the date, remove the Timestamp field.
        // Firestore doesn't support delete via updateDoc without FieldValue.delete(),
        // so we null it out (keep your reads tolerant of null).
        patch.expirationTs = null;
      }
    }

    await updateDoc(doc(db, 'inventory', itemId), patch);
    console.log('Item updated:', itemId);
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

// DELETE
export const deleteInventoryItem = async (itemId) => {
  try {
    await deleteDoc(doc(db, 'inventory', itemId));
    console.log('Item deleted:', itemId);
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};
