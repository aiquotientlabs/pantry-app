// app/login.tsx
import { TabContainer } from '@/components/TabContainer';
import { ThemedView } from '@/components/ThemedView';
import GoogleSignInButton from '../GoogleSignInButton';
import { Image } from 'react-native';

export default function Login() {
  return (
    <ThemedView
      lightColor="#1E4F3D"
      darkColor="#1E4F3D"
      style={{ flex: 1 }}
    >
      <TabContainer>
        <ThemedView
          lightColor="transparent"
          darkColor="transparent"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 40,
          }}
        >
          <Image
            source={require('../assets/images/PVicon.png')}
            style={{
              width: 160,
              height: 160,
              borderRadius: 32,
            }}
            resizeMode="contain"
          />
          <GoogleSignInButton />

        </ThemedView>
      </TabContainer>
    </ThemedView>
  );
}
