import { ItemContainer } from "@/components/ItemContainer";
import { TabContainer } from "@/components/TabContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { ScrollView } from "react-native";


export default function Pantry() {
  return (
    <TabContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedView style={{gap: 10}}>
          <ItemContainer type="grey" name="Apple" quantity="5" category="Fruit" expiration="03-15-2025" />
          <ItemContainer type="grey" name="Apple" quantity="5" category="Fruit" expiration="03-15-2025" /><ItemContainer type="grey" name="Apple" quantity="5" category="Fruit" expiration="03-15-2025" /><ItemContainer type="grey" name="Apple" quantity="5" category="Fruit" expiration="03-15-2025" /><ItemContainer type="grey" name="Apple" quantity="5" category="Fruit" expiration="03-15-2025" /><ItemContainer type="grey" name="Apple" quantity="5" category="Fruit" expiration="03-15-2025" /><ItemContainer type="grey" name="Apple" quantity="5" category="Fruit" expiration="03-15-2025" /><ItemContainer type="grey" name="Apple" quantity="5" category="Fruit" expiration="03-15-2025" /><ItemContainer type="grey" name="Apple" quantity="5" category="Fruit" expiration="03-15-2025" /><ItemContainer type="grey" name="Apple" quantity="5" category="Fruit" expiration="03-15-2025" /><ItemContainer type="grey" name="Apple" quantity="5" category="Fruit" expiration="03-15-2025" />
        </ThemedView>
        <ThemedButton style={{position: 'absolute'}} type="orange" onPress={() => {}}>
          <IconSymbol size={35} name="plus" color={Colors['light'].text} />
        </ThemedButton>
      </ScrollView>
    </TabContainer>
  );
}