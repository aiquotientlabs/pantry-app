import { TabContainer } from '@/components/TabContainer';
import { ThemedButton } from "@/components/ThemedButton";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { ThemedInput } from "@/components/ThemedInput";

export default function AddItem() {
  
  return (
    <TabContainer>
      {/* <ThemedText type="title">Explore</ThemedText> */}
      <ThemedButton type="orange" onPress={() => {}}>
        <IconSymbol size={35} name="plus" color={Colors['light'].text} />
      </ThemedButton>
      <ThemedInput type="grey" placeholder="Item Name" />
      <ThemedInput type="grey" placeholder="Quantity" />
      <ThemedInput type="grey" placeholder="Category" />
      <ThemedInput type="grey" placeholder="Expiration" />
    </TabContainer>
  );
}