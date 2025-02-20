import { ItemContainer } from "@/components/ItemContainer";
import { TabContainer } from "@/components/TabContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedSearchBar } from "@/components/ThemedSearchBar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { ScrollView, View } from "react-native";


export default function Pantry() {
  return (
    <ThemedView style={{padding: 20, paddingVertical: 0, flex: 1}}>

      <ScrollView showsVerticalScrollIndicator={false} style={{paddingVertical: 70}}>
        <ThemedView style={{gap: 10, paddingBottom: 135}}>
          <ItemContainer type="grey" name="Apple" quantity="5" category="Fruit" expiration="03-15-2025" />
          <ItemContainer type="grey" name="B" quantity="\" category="\" expiration="\" /><ItemContainer type="grey" name="C" quantity="\" category="\" expiration="\" /><ItemContainer type="grey" name="D" quantity="\" category="\" expiration="\" /><ItemContainer type="grey" name="E" quantity="\" category="\" expiration="\" /><ItemContainer type="grey" name="F" quantity="\" category="\" expiration="\" /><ItemContainer type="grey" name="G" quantity="\" category="\" expiration="\" /><ItemContainer type="grey" name="H" quantity="\" category="\" expiration="\" />
        </ThemedView>
      </ScrollView>

      <View style={{position: 'absolute', top: 0, left: 0, right: 0, margin: 10, flexDirection: 'row', gap: 10}}>
        <ThemedSearchBar style={{flex: 1}} placeholder="Search" />
      </View>

      {/* TODO: (FUNCTIONALITY) When item is selected, decrease the opacity of all non-selected items and change button to "Delete All Selected" */}
      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, margin: 10, flexDirection: 'row', gap: 10}}>
        <ThemedButton style={{flex: 1}} type='red' onPress={() => {}}>
          <ThemedText darkColor="dark" type='defaultSemiBold'>Delete All</ThemedText>
        </ThemedButton>
      </View>

    </ThemedView>
  );
}