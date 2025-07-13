import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJHi7IjS43toBfeoE-FBdlF4UP2IPSRXY",
  authDomain: "palengke-7eb40.firebaseapp.com",
  projectId: "palengke-7eb40",
  storageBucket: "palengke-7eb40.firebasestorage.app",
  messagingSenderId: "55145367303",
  appId: "1:55145367303:web:7715c55d3a594ee59427a2"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);