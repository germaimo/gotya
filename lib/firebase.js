import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk_0MW1y4WqMdrLo-TIZpVJOIFQm1Dpdw",
  authDomain: "gotya-c34a0.firebaseapp.com",
  projectId: "gotya-c34a0",
  storageBucket: "gotya-c34a0.appspot.com",
  messagingSenderId: "339698868603",
  appId: "1:339698868603:web:2ee5f24aeac6fd7df3ddde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);