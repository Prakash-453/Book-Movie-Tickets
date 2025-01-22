import { initializeApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwV4xg_RShSMBssV2NHlLbwfdFOXESr98",
  authDomain: "theatresdata-baab1.firebaseapp.com",
  projectId: "theatresdata-baab1",
  storageBucket: "theatresdata-baab1.firebasestorage.app",
  messagingSenderId: "328168250758",
  appId: "1:328168250758:web:420e5c351c7009f78ee007",
  measurementId: "G-3CHFFK1YHP"
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