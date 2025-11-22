import React, { useState, useEffect } from 'react';
import { TabContainer } from '@/components/TabContainer';
import { ThemedButton } from "@/components/ThemedButton";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedView } from '@/components/ThemedView';
import { ThemedIcon } from '@/components/ThemedIcon';
import { addInventoryItem } from '../../inventoryService'; //import firestore function
import futureDate from '@/helpers/futureDate';
import { View, Text, StyleSheet } from 'react-native';

export type itemProps = {
  itemName?: string;
  category?: string;
  expiration?: string;
};

export default function AddItem({ itemName = '', category = '', expiration = '' }: itemProps) {
  const [isItemName, setItemName] = useState(itemName);
  const [isQuantity, setQuantity] = useState('');
  const [isCategory, setCategory] = useState(category);
  const [isExpiration, setExpiration] = useState(expiration);

  const formatExpiration = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0,2)}/${digits.slice(2)}`;
    return `${digits.slice(0,2)}/${digits.slice(2,4)}/${digits.slice(4,8)}`;
  }

  const isRealDate = (value: string) => {
    const [month, day, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }

  // New function to handle adding an item to Firestore
  const handleAddItem = async () => {
    if (!isItemName) return;

    const today = new Date();
    const year = today.getFullYear().toString();
    const sDLdate = futureDate(7);
    let exp = isExpiration;
    if (exp.length == 0) exp = sDLdate;
    else if (exp.length == 5) exp = `${exp}/${year}`;
    else if (exp.length != 10) return;
    if (!isRealDate(exp)) return;

    try {
      await addInventoryItem({
        name: isItemName,
        quantity: parseInt(isQuantity) || 1,
        category: isCategory,
        expiration: exp,
        createdAt: new Date().toISOString(),
      });

      // Clear form inputs
      setItemName('');
      setQuantity('');
      setCategory('');
      setExpiration('');

      // show success toast
      showToastMessage('item has been added to your inventory!');
    } catch (error) {
      console.error('Error adding item:', error);
      showToastMessage('Failed to add item.');
    }
  };

  // Toast state and helpers
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  }

  useEffect(() => {
    if (!toastVisible) return;
    const t = setTimeout(() => setToastVisible(false), 3000);
    return () => clearTimeout(t);
  }, [toastVisible]);

  return (
    <TabContainer>
      <ThemedView style={{ gap: 20 }}>
        <ThemedInput
          type="grey"
          onChangeText={newText => setItemName(newText)}
          value={isItemName}
          placeholder="Item Name"
        />

        <ThemedInput
          type="grey"
          onChangeText={newText => setQuantity(newText)}
          value={isQuantity}
          placeholder="Quantity"
        />

        <ThemedView style={{ flexDirection: 'row', gap: 10 }}>
          <ThemedInput
            style={{ flex: 1 }}
            type="grey"
            onChangeText={newText => setCategory(newText)}
            value={isCategory}
            placeholder="Category"
          />
          <ThemedButton type="grey" onPress={() => {
            // Optional: handle sub-action for category
          }}>
            <ThemedIcon size={35} name="plus" type="grey" />
          </ThemedButton>
        </ThemedView>

        <ThemedInput
          type="grey"
          onChangeText={(newText) => setExpiration(formatExpiration(newText))}
          value={isExpiration}
          placeholder="Expiration Date (MM/DD/YYYY)"
        />

        <ThemedButton type="orange" onPress={handleAddItem}>
          <IconSymbol size={35} name="plus" color={Colors['light'].text} />
        </ThemedButton>
      </ThemedView>
      {toastVisible && (
        <View style={styles.toastContainer} pointerEvents="none">
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}
    </TabContainer>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 40,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.95,
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
  },
});
