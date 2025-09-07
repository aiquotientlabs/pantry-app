// inventoryService.js
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// CREATE
export const addInventoryItem = async (item) => {
  try {
    // Get the current user
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('User not authenticated');
    }

    // Combine the passed item data with the user's UID
    const itemWithUser = { ...item, uid: user.uid };

    const docRef = await addDoc(collection(db, 'inventory'), itemWithUser);
    console.log('Item added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding item:', error);
  }
};

// READ
export const fetchInventoryItems = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Create a query that filters for items where uid equals the current user's UID
    const q = query(collection(db, 'inventory'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

// UPDATE remains unchanged—it's up to you to ensure that any updates follow your access rules.
export const updateInventoryItem = async (itemId, updatedData) => {
  try {
    const itemRef = doc(db, 'inventory', itemId);
    await updateDoc(itemRef, updatedData);
    console.log('Item updated:', itemId);
  } catch (error) {
    console.error('Error updating item:', error);
  }
};

// DELETE remains unchanged.
export const deleteInventoryItem = async (itemId) => {
  try {
    await deleteDoc(doc(db, 'inventory', itemId));
    console.log('Item deleted:', itemId);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};
