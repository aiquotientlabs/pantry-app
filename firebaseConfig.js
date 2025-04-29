// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBcODlxioZ7BEeqJjDJMr_ALFvU5cvv1mo",
  authDomain: "food-inventory-app-450214.firebaseapp.com",
  projectId: "food-inventory-app-450214",
  storageBucket: "food-inventory-app-450214.firebasestorage.app",
  messagingSenderId: "995252279634",
  appId: "1:995252279634:web:81898f4fbf21537468028b",
  measurementId: "G-49HTHX61M8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

// Initialize Cloud Firestore and export it for inventory management
export const db = getFirestore(app);
