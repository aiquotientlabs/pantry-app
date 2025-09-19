// app/(tabs)/homescreen.tsx
import { ItemContainer } from "@/components/ItemContainer";
import { TabContainer } from "@/components/TabContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { fetchInventoryItems } from "@/inventoryService";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

import { useRegisterFcmToken } from "@/hooks/useRegisterFcmToken";
import { useShoppingList } from "@/hooks/useShoppingList";

export default function HomeScreen() {
  // Register device token for push after sign-in
  useRegisterFcmToken();

  const colorScheme = useColorScheme();

  // Upstream: inventory fetching for "Expiring Soon" (currently all items)
  const [inventory, setInventory] = useState<any[]>([]);
  const loadInventory = async () => {
    const items = await fetchInventoryItems();
    setInventory(items ?? []);
  };
  useFocusEffect(
    useCallback(() => {
      loadInventory();
    }, [])
  );

  // Your low-stock (≤ 1) live query
  const { items: lowStock, loading } = useShoppingList(1);

  return (
    <TabContainer>
      {/* Top action button (unchanged) */}
      <ThemedView style={{ flex: 1 }}>
        <ThemedButton style={{ flex: 1 }} type="grey" onPress={() => {}}>
          <ThemedIcon size={35} name="plus" type="grey" />
        </ThemedButton>
      </ThemedView>

      {/* Expiring Soon (placeholder: currently shows all inventory from upstream) */}
      <ThemedView style={{ flex: 1 }}>
        <ThemedText type="title" style={{ paddingBottom: 10 }}>
          Expiring Soon:
        </ThemedText>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ThemedView style={{ gap: 10 }}>
            {inventory.length > 0 ? (
              inventory.map((item: any, idx: number) => {
                const key =
                  item.id ??
                  `${item.name ?? "Unnamed"}|${item.expiration ?? ""}|${
                    item.quantity ?? 0
                  }|${idx}`;
                // TODO: when expiration becomes a real date, filter to ≤ 3 days here.
                return (
                  <ItemContainer
                    key={key}
                    type="grey"
                    name={item.name || "Unnamed"}
                    quantity={item.quantity ? String(item.quantity) : "0"}
                    category={item.category || ""}
                    expiration={item.expiration || ""}
                  />
                );
              })
            ) : (
              <ThemedText>No items yet.</ThemedText>
            )}
          </ThemedView>
        </ScrollView>
      </ThemedView>

      {/* Low-stock / Shopping list preview (live from Firestore) */}
      <ThemedView style={{ flex: 1 }}>
        <ThemedText type="title" style={{ paddingBottom: 10 }}>
          Low stock (≤ 1)
        </ThemedText>

        {loading ? (
          <ThemedText>Loading…</ThemedText>
        ) : lowStock.length === 0 ? (
          <ThemedText>Nothing to buy 🎉</ThemedText>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <ThemedView style={{ gap: 10 }}>
              {lowStock.map((it: any) => (
                <ItemContainer
                  key={it.id}
                  type="grey"
                  name={String(it.name ?? "Unknown")}
                  quantity={String(it.quantity ?? 0)}
                  category={String(it.category ?? "-")}
                  expiration={String(it.expiration ?? "")}
                />
              ))}
            </ThemedView>
          </ScrollView>
        )}
      </ThemedView>
    </TabContainer>
  );
}
