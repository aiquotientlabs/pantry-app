import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function OAuthRedirect() {
  useEffect(() => {
    // expo-auth-session will handle the OAuth callback, so we can simply wait here.
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
