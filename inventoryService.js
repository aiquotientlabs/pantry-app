// inventoryService.js
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// CREATE
export const addInventoryItem = async (item) => {
  try {
    const docRef = await addDoc(collection(db, 'inventory'), item);
    console.log('Item added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding item:', error);
  }
};

// READ
export const fetchInventoryItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'inventory'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

// UPDATE
export const updateInventoryItem = async (itemId, updatedData) => {
  try {
    const itemRef = doc(db, 'inventory', itemId);
    await updateDoc(itemRef, updatedData);
    console.log('Item updated:', itemId);
  } catch (error) {
    console.error('Error updating item:', error);
  }
};

// DELETE
export const deleteInventoryItem = async (itemId) => {
  try {
    await deleteDoc(doc(db, 'inventory', itemId));
    console.log('Item deleted:', itemId);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

