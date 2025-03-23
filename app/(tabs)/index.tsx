import { Text, View } from "react-native";
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import GoogleSignInButton from '../../GoogleSignInButton';

export default function Index() {
  const colorScheme = useColorScheme();
  
  return (
    <ThemedView 
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText>HOME DASHBOARD</ThemedText>

      {/* Render your Google sign-in button below */}
      <GoogleSignInButton />
    </ThemedView>
  );
}
