import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatapp-2a7e5.firebaseapp.com",
  projectId: "chatapp-2a7e5",
  storageBucket: "chatapp-2a7e5.appspot.com",
  messagingSenderId: "919425528271",
  appId: "1:919425528271:web:44e94e72ee9a104c62a2ba"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()