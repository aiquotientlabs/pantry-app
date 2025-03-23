// GoogleSignInButton.js
import React, { useEffect } from 'react';
import { Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Complete any pending auth sessions (important on Android)
WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  // Generate a custom redirect URI using your app scheme, disabling the proxy
  const redirectUri = makeRedirectUri({
    scheme: 'com.aiquotientlabs.pantryapp',
    useProxy: false,
  });

  useEffect(() => {
    console.log('Redirect URI:', redirectUri);
  }, [redirectUri]);

  const [request, response, promptAsync] = Google.useAuthRequest({
    // Use the correct Android OAuth client ID (matching your SHA-1 and package name)
    androidClientId: '995252279634-b8fi5ikbcnup88q02hrn5u0kf9poe4cc.apps.googleusercontent.com',
    // Optional iOS client ID (replace with your own if you test on iOS)
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.idToken) {
        const credential = GoogleAuthProvider.credential(authentication.idToken);
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            console.log('User signed in:', userCredential.user);
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
