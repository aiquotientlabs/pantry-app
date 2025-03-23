import { TabContainer } from '@/components/TabContainer';
import { ThemedButton } from "@/components/ThemedButton";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedView } from '@/components/ThemedView';
import { ThemedIcon } from '@/components/ThemedIcon';

export default function AddItem() {
  
  return (
    <TabContainer>

      <ThemedView style={{gap: 20}}>

        <ThemedInput type="grey" placeholder="Item Name" />

        <ThemedInput type="grey" placeholder="Quantity" />

        <ThemedView style={{flexDirection: 'row', gap: 10}}>
          <ThemedInput style={{flex: 1}} type="grey" placeholder="Category" />
          <ThemedButton type="grey" onPress={() => {}}>
            <ThemedIcon size={35} name="plus" type='grey' />
          </ThemedButton>
        </ThemedView>

        <ThemedInput type="grey" placeholder="Expiration Date" />

        <ThemedButton type="orange" onPress={() => {}}>
          <IconSymbol size={35} name="plus" color={Colors['light'].text} />
        </ThemedButton>

      </ThemedView>
      
    </TabContainer>
  );
}