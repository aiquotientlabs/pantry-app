import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  const theme = useColorScheme() ?? 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['orange'].icon,
        tabBarButton: HapticTab,
        headerRight: () => (
          <TouchableOpacity onPress={() => {alert('Settings not yet implemented!')}}>
            <IconSymbol size={28} name="gear" color={Colors[theme].icon} style={styles.headerIcon} />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="homescreen"
        options={{
          title: 'Home',
          headerTitle: 'Home Dashboard',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Scan Item',
          headerShown: false,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="camera.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="addItem"
        options={{
          title: 'Add Item',
          headerTitle: 'Add To Pantry',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="cart.fill.badge.plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pantry"
        options={{
          title: 'Pantry',
          headerTitle: 'Pantry Overview',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    paddingRight: 20
  },
});
