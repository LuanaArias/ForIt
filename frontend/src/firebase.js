import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyJPU0kz-8WhPfEAiTjAAQ0cOqevOGpOw",
  authDomain: "taskify-20ac7.firebaseapp.com",
  projectId: "taskify-20ac7",
  storageBucket: "taskify-20ac7.firebasestorage.app",
  messagingSenderId: "1055079898866",
  appId: "1:1055079898866:web:d2b2470ce3ffa337aefa6b",
  measurementId: "G-6NFRRZ1PN8"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Inicializamos y exportamos estas constantes para usarlas en tus botones
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();