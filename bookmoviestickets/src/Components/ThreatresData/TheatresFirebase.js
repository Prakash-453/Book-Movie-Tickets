import { initializeApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9Q4Dje1Et1NPoLarfIbws3RU1SXdQOLE",
  authDomain: "theatres-475e5.firebaseapp.com",
  projectId: "theatres-475e5",
  storageBucket: "theatres-475e5.firebasestorage.app",
  messagingSenderId: "422591445124",
  appId: "1:422591445124:web:166972718463f03c97ead1",
  measurementId: "G-9R6L9TPW2E"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db=getFirestore(app);

export default db ;