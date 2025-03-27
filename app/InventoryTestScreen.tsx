// app/InventoryTestScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { addInventoryItem, fetchInventoryItems, deleteInventoryItem } from '../inventoryService';

// Define an interface for your inventory items
interface InventoryItem {
  id: string;
  name?: string;
  quantity?: number;
  createdAt?: string;
}

export default function InventoryTestScreen(): JSX.Element {
  const [itemName, setItemName] = useState<string>('');
  const [items, setItems] = useState<InventoryItem[]>([]);

  const loadInventory = async () => {
    const fetchedItems = await fetchInventoryItems();
    setItems(fetchedItems ?? []); // Default to an empty array if undefined
  };

  const handleAddItem = async () => {
    if (!itemName) return;
    await addInventoryItem({
      name: itemName,
      quantity: 1,
      createdAt: new Date().toISOString(),
    });
    setItemName('');
    loadInventory();
  };

  const handleDeleteItem = async (itemId: string) => {
    await deleteInventoryItem(itemId);
    loadInventory();
  };

  useEffect(() => {
    loadInventory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inventory Test Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item name"
        value={itemName}
        onChangeText={setItemName}
      />
      <Button title="Add Item" onPress={handleAddItem} />
      <Text style={styles.header}>Current Inventory:</Text>
      {/* {items.map((item) => (
  <View key={item.id} style={styles.itemRow}>
    <Text>{item.name}</Text>
    <Button title="Delete" onPress={() => handleDeleteItem(item.id)} />
  </View>
))} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 4 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
});
