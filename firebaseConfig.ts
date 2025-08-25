import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 👇 apna Firebase config paste karo
const firebaseConfig = {
    apiKey: "AIzaSyDYszeN7GMMsQpPCLzwQuLdhsI1cAWL_Ek",
    authDomain: "shayari-cccb5.firebaseapp.com",
    projectId: "shayari-cccb5",
    storageBucket: "shayari-cccb5.firebasestorage.app",
    messagingSenderId: "191165941423",
    appId: "1:191165941423:web:b0610bfd497650f258765a",
    measurementId: "G-ZP38Z6TECV"  
};

// Init app
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);