import { ItemContainer } from "@/components/ItemContainer";
import { TabContainer } from "@/components/TabContainer";
import { ThemedInput } from "@/components/ThemedInput";
import { ScrollView } from "react-native";


export default function Pantry() {
  return (
    <TabContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ItemContainer type="grey" name="Apple" quantity="5" category="Fruit" expiration="03-15-2025" />
      </ScrollView>
    </TabContainer>
  );
}