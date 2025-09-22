// app/(tabs)/addItem.tsx
import React, { useState } from 'react';
import { TabContainer } from '@/components/TabContainer';
import { ThemedButton } from "@/components/ThemedButton";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedView } from '@/components/ThemedView';
import { ThemedIcon } from '@/components/ThemedIcon';
import { addInventoryItem } from '../../inventoryService';

export type itemProps = {
  itemName?: string;
  category?: string;
  expiration?: string; // MM/DD/YYYY
};

export default function AddItem({ itemName = '', category = '', expiration = '' }: itemProps) {
  const [isItemName, setItemName] = useState(itemName);
  const [isQuantity, setQuantity] = useState('');
  const [isCategory, setCategory] = useState(category);
  const [isExpiration, setExpiration] = useState(expiration);

  // Keep your input helpers
  const formatExpiration = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0,2)}/${digits.slice(2)}`;
    return `${digits.slice(0,2)}/${digits.slice(2,4)}/${digits.slice(4,8)}`;
  };

  const isRealDate = (value: string) => {
    if (!value) return true; // allow blank; backend just won’t set expirationTs
    const [month, day, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return (
      year >= 1000 &&
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const handleAddItem = async () => {
    if (!isItemName?.trim()) return;

    // If user typed something, make sure it's a valid MM/DD/YYYY
    if (isExpiration?.trim() && !isRealDate(isExpiration.trim())) {
      alert('Please enter a valid date as MM/DD/YYYY');
      return;
    }

    try {
      await addInventoryItem({
        name: isItemName.trim(),
        quantity: parseInt(isQuantity, 10) || 1,
        category: (isCategory ?? '').trim(),
        expiration: (isExpiration ?? '').trim(), // service parses -> expirationTs; also sets createdAtTs
      });

      // Clear form inputs
      setItemName('');
      setQuantity('');
      setCategory('');
      setExpiration('');

      alert('Item added!');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item.');
    }
  };

  return (
    <TabContainer>
      <ThemedView style={{ gap: 20 }}>
        <ThemedInput
          type="grey"
          onChangeText={setItemName}
          value={isItemName}
          placeholder="Item Name"
        />

        <ThemedInput
          type="grey"
          onChangeText={setQuantity}
          value={isQuantity}
          placeholder="Quantity"
          keyboardType="numeric"
        />

        <ThemedView style={{ flexDirection: 'row', gap: 10 }}>
          <ThemedInput
            style={{ flex: 1 }}
            type="grey"
            onChangeText={setCategory}
            value={isCategory}
            placeholder="Category"
          />
          <ThemedButton type="grey" onPress={() => {}}>
            <ThemedIcon size={35} name="plus" type="grey" />
          </ThemedButton>
        </ThemedView>

        <ThemedInput
          type="grey"
          onChangeText={(t) => setExpiration(formatExpiration(t))}
          value={isExpiration}
          placeholder="Expiration Date (MM/DD/YYYY)"
        />

        <ThemedButton type="orange" onPress={handleAddItem}>
          <IconSymbol size={35} name="plus" color={Colors.light.text} />
        </ThemedButton>
      </ThemedView>
    </TabContainer>
  );
}
