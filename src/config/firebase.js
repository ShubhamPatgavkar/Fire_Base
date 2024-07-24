// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAbIYkoKtzu_hQqe62JJOeKx9GTFdFkU9A",
    authDomain: "basic-526ee.firebaseapp.com",
    projectId: "basic-526ee",
    storageBucket: "basic-526ee.appspot.com",
    messagingSenderId: "671955017977",
    appId: "1:671955017977:web:65b30c156708ff3daa8228",
    measurementId: "G-E5EY9NX5CZ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
