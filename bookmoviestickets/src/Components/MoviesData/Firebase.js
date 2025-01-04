// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBJSmvUGwYRrm9C-Sr-AGBimDIgDdkwyHc",
  authDomain: "movies-data-b1432.firebaseapp.com",
  projectId: "movies-data-b1432",
  storageBucket: "movies-data-b1432.appspot.com",
  messagingSenderId: "739266761450",
  appId: "1:739266761450:web:76f9980fbd0b925dda7d93",
  measurementId: "G-KLVZWCKHSZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;

