import { ItemContainer } from "@/components/ItemContainer";
import { TabContainer } from "@/components/TabContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import { useColorScheme } from '@/hooks/useColorScheme';
import { fetchInventoryItems } from "@/inventoryService";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";


export default function Index() {
  const colorScheme = useColorScheme();

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
    <TabContainer>
      <ThemedView style={{flex: 1}}>
        <ThemedButton style={{flex: 1}} type="grey" onPress={() => {}}>
          <ThemedIcon size={35} name="plus" type='grey' />
        </ThemedButton>
      </ThemedView>
      <ThemedView style={{flex: 1}}>
        <ThemedText type="title" style={{paddingBottom: 10}}>Expiring Soon:</ThemedText>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ThemedView style={{gap: 10}}>
            {inventory.length > 0 ? (
              inventory.map((item) => {
                const itemId = item.quantity + item.name + item.expiration;
                // TODO: change expiration to type DATE (MM/DD/YYYY) and filter by items within 3 days of expiration
                return (
                  <ItemContainer
                    key={itemId}
                    type="grey"
                    name={item.name || 'Unnamed'}
                    quantity={item.quantity ? item.quantity.toString() : '0'}
                    category={item.category || ''}
                    expiration={item.expiration || ''}
                  />
                );
              })
            ) : (
              <ThemedText>No items yet.</ThemedText>
            )}
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </TabContainer>
  );
}
