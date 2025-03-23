import { ItemContainer } from "@/components/ItemContainer";
import { TabContainer } from "@/components/TabContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";


export default function Index() {
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
            <ItemContainer type="grey" name="Apple" quantity="5" category="Fruit" expiration="03-15-2025" />
            <ItemContainer type="grey" name="B" quantity="\" category="\" expiration="\" /><ItemContainer type="grey" name="C" quantity="\" category="\" expiration="\" /><ItemContainer type="grey" name="D" quantity="\" category="\" expiration="\" /><ItemContainer type="grey" name="E" quantity="\" category="\" expiration="\" /><ItemContainer type="grey" name="F" quantity="\" category="\" expiration="\" /><ItemContainer type="grey" name="G" quantity="\" category="\" expiration="\" /><ItemContainer type="grey" name="H" quantity="\" category="\" expiration="\" />
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </TabContainer>
  );
}
