import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAH57qenf0nkcV4zpHiM0-wnfyGdoCerYg",
  authDomain: "movies-data-ca8bb.firebaseapp.com",
  projectId: "movies-data-ca8bb",
  storageBucket: "movies-data-ca8bb.firebasestorage.app",
  messagingSenderId: "824550398156",
  appId: "1:824550398156:web:73e7a57c26f78604888a69",
  measurementId: "G-9FW3FSGT8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);

export default db;