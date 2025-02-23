import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, Redirect, useRouter } from "expo-router"
import { getItemAsync } from "expo-secure-store";
import { Text, View, StyleSheet } from "react-native"

export default function Index() {
  const colorScheme = useColorScheme();
  
  return <Redirect href="/login" />
}