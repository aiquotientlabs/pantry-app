// firebaseConfig.js (React Native)
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcODlxioZ7BEeqJjDJMr_ALFvU5cvv1mo",
  authDomain: "food-inventory-app-450214.firebaseapp.com",
  projectId: "food-inventory-app-450214",
  storageBucket: "food-inventory-app-450214.firebasestorage.app",
  messagingSenderId: "995252279634",
  appId: "1:995252279634:web:81898f4fbf21537468028b",
  measurementId: "G-49HTHX61M8",
};

const app = initializeApp(firebaseConfig);

// ✅ RN-specific auth with device persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
