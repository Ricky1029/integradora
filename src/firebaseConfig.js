import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMC56Cs7cy4ygmi8-MsaY10kHGW4Ce_5E",
  authDomain: "integradorall-d6925.firebaseapp.com",
  projectId: "integradorall-d6925",
  storageBucket: "integradorall-d6925.appspot.com",
  messagingSenderId: "1090186308149",
  appId: "1:1090186308149:web:17bfa09ebe68422bfe9f7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, getDoc, setDoc };
