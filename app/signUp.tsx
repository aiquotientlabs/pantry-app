import { TabContainer } from '@/components/TabContainer';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

export default function SignUp() {
    return (
    <TabContainer>

        <ThemedView style={{ gap: 20, justifyContent: 'center', flex: 1 }}>

            <ThemedInput type="grey" placeholder="Choose Username" />

            <ThemedInput type="grey" placeholder="Choose Password" />

            <ThemedInput type="grey" placeholder="Confirm Password" />

            <ThemedButton type = "orange" onPress={() => router.push('/login')}> 
                <ThemedText type="subtitle" style={{color: Colors['light'].text}}>Create Account</ThemedText> 
            </ThemedButton>

        </ThemedView>
      
    </TabContainer>
  );
}