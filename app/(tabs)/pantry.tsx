import React, { useState, useCallback } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedSearchBar } from '@/components/ThemedSearchBar';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ItemContainer } from '@/components/ItemContainer';
import { fetchInventoryItems } from '../../inventoryService';
import { useFocusEffect } from '@react-navigation/native';

export default function Pantry() {
  const [inventory, setInventory] = useState<any[]>([]);

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
            inventory.map((item) => (
              <ItemContainer
                key={item.id}
                type="grey"
                name={item.name || 'Unnamed'}
                quantity={item.quantity ? item.quantity.toString() : '0'}
                category={item.category || ''}
                expiration={item.expiration || ''}
              />
            ))
          ) : (
            <ThemedText>No items yet.</ThemedText>
          )}
        </ThemedView>
      </ScrollView>

      <View style={styles.searchContainer}>
        <ThemedSearchBar style={{ flex: 1 }} placeholder="Search" />
      </View>

      <View style={styles.footer}>
        <ThemedButton style={{ flex: 1 }} type="red" onPress={() => { /* TODO: implement delete all functionality if needed */ }}>
          <ThemedText darkColor="dark" type="defaultSemiBold">
            Delete All
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
