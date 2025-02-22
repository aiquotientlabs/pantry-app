import { TabContainer } from '@/components/TabContainer';
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity, Text} from "react-native";

export default function SignUp() {
    return (
    <TabContainer>

        <ThemedView style={{gap: 20}}>

            <ThemedInput type="grey" placeholder="Choose Username" />

            <ThemedInput type="grey" placeholder="Choose Password" />

            <ThemedInput type="grey" placeholder="Confirm Password" />

            <TouchableOpacity
                      style={{
                        backgroundColor: "orange",
                        padding: 15,
                        borderRadius: 10,
                        alignItems: "center",
                      }}
                      activeOpacity={0.6}
                      onPress={() => {}}>
                      <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Create Account</Text>
                    </TouchableOpacity>

        </ThemedView>
      
    </TabContainer>
  );
}