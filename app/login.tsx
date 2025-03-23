import { TabContainer } from '@/components/TabContainer';
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity, Text } from "react-native";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin"
import DeviceInfo from "react-native-device-info"
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { Link, Redirect, useRouter } from "expo-router"
import { useState } from 'react';


export default function Login() {
  
 
  const [isSignedIn, setSignedIn] = useState(false);

  if (isSignedIn) {
    return <Redirect href="./(tabs)/homescreen" />
  }

  return (
    <TabContainer>

      <ThemedView style={{ gap: 20 }}>

        <ThemedInput type="grey" placeholder="Username..." style={{ marginTop: 200 }} />

        <ThemedInput type="grey" placeholder="Password..." />

        <ThemedButton type = "orange" > <ThemedText type="subtitle"> <Link href="./(tabs)/homescreen"> Login </Link> </ThemedText> </ThemedButton>

        <TouchableOpacity style={{ alignSelf: "center" }}>
          <Text style={{ color: "cyan", fontSize: 16, textDecorationLine: "underline" }}>Forgot Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ alignSelf: "center" }}>
          <Text style={{ color: "cyan", fontSize: 16, textDecorationLine: "underline" }}><Link href="/signUp">Sign Up</Link></Text>
        </TouchableOpacity>

      </ThemedView>
    
    </TabContainer>
  );
}
