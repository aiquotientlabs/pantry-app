// GoogleSignInButton.js
import React, { useEffect } from 'react';
import { Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useRouter } from 'expo-router'; // Added for navigation

// Complete any pending auth sessions (important on Android)
WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  const router = useRouter(); // Initialize router

  // Use useIdTokenAuthRequest for native (installed) apps
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      // Use your Android OAuth client ID (configured with your package name and SHA‑1)
      clientId: '995252279634-b8fi5ikbcnup88q02hrn5u0kf9poe4cc.apps.googleusercontent.com',
    },
    {
      // The native redirect URI should match your app.json scheme.
      // In this example, it becomes: "com.aiquotientlabs.pantryapp:/oauthredirect"
      native: 'com.aiquotientlabs.pantryapp:/oauthredirect',
    }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      // The ID token is provided in response.params.id_token
      const { id_token: idToken } = response.params;
      if (idToken) {
        const credential = GoogleAuthProvider.credential(idToken);
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            console.log('User signed in:', userCredential.user);
            // Navigate to the homescreen after successful sign in:
            router.replace('/homescreen');
          })
          .catch((error) => {
            console.error('Error during sign in:', error);
          });
      }
    }
  }, [response]);

  return (
    <Button
      title="Sign in with Google"
      disabled={!request}
      onPress={() => promptAsync()}
    />
  );
}
