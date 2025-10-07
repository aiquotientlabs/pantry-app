// app/(tabs)/homescreen.tsx
import { ItemContainer } from "@/components/ItemContainer";
import { TabContainer } from "@/components/TabContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";

import { useRegisterFcmToken } from "@/hooks/useRegisterFcmToken";
import { useShoppingList } from "@/hooks/useShoppingList";
import { useExpiringSoon } from "@/hooks/useExpiringSoon";

export default function HomeScreen() {
  // Register device token for push after sign-in
  useRegisterFcmToken();

  // Expiring in ≤ 3 days
  const { items: expiringSoon, loading: expiringLoading } = useExpiringSoon(3);

  // Low-stock (≤ 1)
  const { items: lowStock, loading: lowStockLoading } = useShoppingList(1);

  return (
    <TabContainer>
      {/* Expiring Soon (≤ 3 days) */}
      <ThemedView style={{ flex: 1 }}>
        <ThemedText type="title" style={{ paddingBottom: 10 }}>
          Expiring Soon (≤ 3 days):
        </ThemedText>

        {expiringLoading ? (
          <ThemedText>Loading…</ThemedText>
        ) : expiringSoon.length === 0 ? (
          <ThemedText>No items expiring soon!</ThemedText>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <ThemedView style={{ gap: 10 }}>
              {expiringSoon.map((item: any) => (
                <ItemContainer
                  key={item.id}
                  type="grey"
                  name={String(item.name ?? "Unnamed")}
                  quantity={String(item.quantity ?? 0)}
                  category={String(item.category ?? "")}
                  expiration={String(item.expiration ?? "")}
                />
              ))}
            </ThemedView>
          </ScrollView>
        )}
      </ThemedView>

      {/* Low-stock / Shopping list preview (live from Firestore) */}
      <ThemedView style={{ flex: 1 }}>
        <ThemedText type="title" style={{ paddingBottom: 10 }}>
          Low stock (≤ 1)
        </ThemedText>

        {lowStockLoading ? (
          <ThemedText>Loading…</ThemedText>
        ) : lowStock.length === 0 ? (
          <ThemedText>Nothing to buy!</ThemedText>
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
