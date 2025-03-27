import { TabContainer } from '@/components/TabContainer';
import { ThemedButton } from "@/components/ThemedButton";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedView } from '@/components/ThemedView';
import { ThemedIcon } from '@/components/ThemedIcon';
import { useState } from 'react';

export type itemProps = {
  itemName: string | undefined,
  category?: string | undefined,
  expiration?: string | undefined,
};

export default function AddItem({ itemName = '', category = '', expiration = '' }: itemProps) {
  const [isItemName, setItemName] = useState(itemName);
  const [isQuantity, setQuantity] = useState('');
  const [isCategory, setCategory] = useState(category);
  const [isExpiration, setExpiration] = useState(expiration);
  
  return (
    <TabContainer>

      <ThemedView style={{gap: 20}}>

        <ThemedInput type="grey" onChangeText={newText => setItemName(newText)} value={isItemName} placeholder="Item Name" />

        <ThemedInput type="grey" onChangeText={newText => setQuantity(newText)} value={isQuantity} placeholder="Quantity" />

        <ThemedView style={{flexDirection: 'row', gap: 10}}>
          <ThemedInput style={{flex: 1}} type="grey" onChangeText={newText => setCategory(newText)} value={isCategory} placeholder="Category" />
          <ThemedButton type="grey" onPress={() => {}}>
            <ThemedIcon size={35} name="plus" type='grey' />
          </ThemedButton>
        </ThemedView>

        <ThemedInput type="grey" onChangeText={newText => setExpiration(newText)} value={isExpiration} placeholder="Expiration Date" />

        <ThemedButton type="orange" onPress={() => {}}>
          <IconSymbol size={35} name="plus" color={Colors['light'].text} />
        </ThemedButton>

      </ThemedView>
      
    </TabContainer>
  );
}