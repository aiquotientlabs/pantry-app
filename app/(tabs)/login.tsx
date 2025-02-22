import { TabContainer } from '@/components/TabContainer';
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity, Text } from "react-native";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin"
import DeviceInfo from "react-native-device-info"


export default function Login() {
  
  return (
    <TabContainer>

      <ThemedView style={{ gap: 20 }}>

        <ThemedInput type="grey" placeholder="Username..." style={{ marginTop: 200 }} />

        <ThemedInput type="grey" placeholder="Password..." />

        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          }}
          activeOpacity={0.6}
          onPress={() => {}}>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignSelf: "center" }}>
          <Text style={{ color: "cyan", fontSize: 16, textDecorationLine: "underline" }}>Forgot Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ alignSelf: "center" }}>
          <Text style={{ color: "cyan", fontSize: 16, textDecorationLine: "underline" }}>Sign Up</Text>
        </TouchableOpacity>

        

      </ThemedView>
      
    </TabContainer>
  );
}
