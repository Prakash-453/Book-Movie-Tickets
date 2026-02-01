import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKczBvOhaggQHFhTUItneuZTc6Zk9XtCI",
  authDomain: "movies--data-37ed6.firebaseapp.com",
  projectId: "movies--data-37ed6",
  storageBucket: "movies--data-37ed6.firebasestorage.app",
  messagingSenderId: "659356063125",
  appId: "1:659356063125:web:27074b89bc4d4d7f3ad29c",
  measurementId: "G-SK5C7E7VD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);

export default db;