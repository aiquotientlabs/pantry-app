import React, { useState, useCallback } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedSearchBar } from '@/components/ThemedSearchBar';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ItemContainer } from '@/components/ItemContainer';
import { fetchInventoryItems, deleteInventoryItem } from '../../inventoryService';
import { useFocusEffect } from '@react-navigation/native';

export default function Pantry() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const loadInventory = async () => {
    const items = await fetchInventoryItems();
    setInventory(items ?? []);
  };

  // Refresh inventory whenever the screen is focused.
  useFocusEffect(
    useCallback(() => {
      loadInventory();
    }, [])
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 70 }}>
        <ThemedView style={{ gap: 10, paddingBottom: 135 }}>
          {inventory.length > 0 ? (
            inventory.map((item) => {
              const itemId = item.quantity + item.name + item.expiration;
              const isSelected = selectedItems.includes(itemId);
              return (
                <ItemContainer
                  key={itemId}
                  type="grey"
                  name={item.name || 'Unnamed'}
                  quantity={item.quantity ? item.quantity.toString() : '0'}
                  category={item.category || ''}
                  expiration={item.expiration || ''}
                  selected={isSelected}
                  onPress={() => {
                    setSelectedItems(prev =>
                      prev.includes(itemId)
                        ? prev.filter(i => i !== itemId)
                        : [...prev, itemId]
                    );
                  }}
                />
              );
            })
          ) : (
            <ThemedText>No items yet.</ThemedText>
          )}
        </ThemedView>
      </ScrollView>

      <View style={styles.searchContainer}>
        <ThemedSearchBar style={{ flex: 1 }} placeholder="Search" />
      </View>

      <View style={styles.footer}>
        <ThemedButton style={{ flex: 1 }} type={selectedItems.length > 0 ? 'red' : 'grey'} onPress={() => {
          {inventory.forEach(item => {
            const itemId = item.quantity + item.name + item.expiration;
            if (selectedItems.includes(itemId)) {
              deleteInventoryItem(item.id);
              setSelectedItems(prev => prev.filter(i => i !== itemId));
              loadInventory();
            }
          })}
        }}>
          <ThemedText darkColor="dark" type="defaultSemiBold">
            Delete
          </ThemedText>
        </ThemedButton>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingVertical: 0 },
  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    margin: 10,
    flexDirection: 'row',
    gap: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 10,
    flexDirection: 'row',
    gap: 10,
  },
});
