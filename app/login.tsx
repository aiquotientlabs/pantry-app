import { TabContainer } from '@/components/TabContainer';
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity, Text } from "react-native";
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { router } from "expo-router"
import { useState } from 'react';
import { Colors } from '@/constants/Colors';


export default function Login() {
  
 
  const [isSignedIn, setSignedIn] = useState(false);

  if (isSignedIn) {
    router.push('/homescreen');
  }

  return (
    <TabContainer>

      <ThemedView style={{ gap: 20, justifyContent: 'center', flex: 1 }}>

        <ThemedInput type="grey" placeholder="Username..." />

        <ThemedInput type="grey" placeholder="Password..." />

        <ThemedButton type = "orange" onPress={() => router.push('/homescreen')}> 
          <ThemedText type="subtitle" style={{color: Colors['light'].text}}>Login</ThemedText> 
        </ThemedButton>

        <TouchableOpacity style={{ alignSelf: "center" }}>
          <Text style={{ color: "cyan", fontSize: 16, textDecorationLine: "underline" }}>Forgot Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => router.push('/signUp')}>
          <Text style={{ color: "cyan", fontSize: 16, textDecorationLine: "underline" }}>Sign Up</Text>
        </TouchableOpacity>

      </ThemedView>
    
    </TabContainer>
  );
}
