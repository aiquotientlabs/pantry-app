import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, useColorScheme, Modal, View, Text, Pressable, SafeAreaView, } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { router } from "expo-router"

export default function TabLayout() {
  const theme = useColorScheme() ?? 'light';
  const [menuVisible, setMenuVisible] = React.useState(false);
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors['orange'].icon,
          tabBarButton: HapticTab,
          headerRight: () => (
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <IconSymbol
                size={28}
                name="gear"
                color={Colors[theme].icon}
                style={styles.headerIcon}
              />
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
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="camera.fill" color={color} />
            ),
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
      
      <SettingsMenu
        visible={menuVisible}
        // 'Closes' the submenu that is opened
        onClose={() => setMenuVisible(false)}
        onAbout={() => {
          setMenuVisible(false);
        }}
        // Simply navigates to the login screen and closes the sub menu. Needs actual implementation.
        onLogout={() => {
          router.push('/login')
          setMenuVisible(false);
        }}
        theme={theme}
      />
    </>
  );
}

function SettingsMenu({
  visible,
  onClose,
  onAbout,
  onLogout,
  theme,
}: {
  visible: boolean;
  onClose: () => void;
  onAbout: () => void;
  onLogout: () => void;
  theme: 'light' | 'dark';
}) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <SafeAreaView style={styles.menuSafeArea}>
          <Pressable style={[styles.menuPanel, theme === 'dark' && styles.menuPanelDark]} onPress={() => {}}>
            <Pressable style={styles.menuItem} onPress={onAbout}>
              <Text style={[styles.menuText, theme === 'dark' && styles.menuTextDark]}>About</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.menuItem} onPress={onLogout}>
              <Text style={[styles.menuText, styles.destructive, theme === 'dark' && styles.menuTextDark]}>
                Logout
              </Text>
            </Pressable>
          </Pressable>
        </SafeAreaView>
      </Pressable>
    </Modal>
  );
}




const styles = StyleSheet.create({
  headerIcon: { paddingRight: 20 },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuSafeArea: {
    width: '100%',
  },
  // This is just some basic styling for the submenu that can be changed to whatever
  // We can also create a different file just for the stylesheet as well if need be.
  menuPanel: {
    marginTop: Platform.select({ ios: 8, android: 8 }),
    marginRight: 8,
    minWidth: 180,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  menuPanelDark: {
    backgroundColor: '#1f1f1f',
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
  },
  menuTextDark: {
    color: '#f5f5f5',
  },
  destructive: {
    color: '#d22',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.12)',
    marginHorizontal: 8,
  },
});