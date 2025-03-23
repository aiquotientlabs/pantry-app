import { TabContainer } from '@/components/TabContainer';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity, Text} from "react-native";

export default function SignUp() {
    return (
    <TabContainer>

        <ThemedView style={{gap: 20}}>

            <ThemedInput type="grey" placeholder="Choose Username" />

            <ThemedInput type="grey" placeholder="Choose Password" />

            <ThemedInput type="grey" placeholder="Confirm Password" />

            <ThemedButton type = "orange" > <ThemedText type="subtitle"> Create Account </ThemedText> </ThemedButton>

        </ThemedView>
      
    </TabContainer>
  );
}