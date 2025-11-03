import React, { useEffect } from 'react';
import { Pressable, Image, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useRouter } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  const router = useRouter();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '995252279634-b8fi5ikbcnup88q02hrn5u0kf9poe4cc.apps.googleusercontent.com',
    },
    {
      native: 'com.aiquotientlabs.pantryapp:/oauthredirect',
    }
  );

  useEffect(() => {
    (async () => {
      if (response?.type !== 'success') return;

      const idToken = response?.params?.id_token;
      if (!idToken) return;

      try {
        const credential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, credential);
        router.replace('/homescreen');
      } catch (err) {
        console.error('Google sign-in error:', err);
      }
    })();
  }, [response, router]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Sign in with Google"
      disabled={!request}
      onPress={() => promptAsync()}
      style={({ pressed }) => [
        styles.pressable,
        pressed && { opacity: 0.85 },
        !request && { opacity: 0.5 },
      ]}
    >
      <Image
        source={require('./assets/images/googleSignIn.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: { alignItems: 'center', justifyContent: 'center' },
  image: { width: 220, height: 48 },
});
