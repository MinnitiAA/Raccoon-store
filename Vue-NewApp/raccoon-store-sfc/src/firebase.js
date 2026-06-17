import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCDcvQCCGQeQDyMwSJRKklh8Rzyd1vfHns",
    authDomain: "fir-demo-77a8d.firebaseapp.com",
    projectId: "fir-demo-77a8d",
    storageBucket: "fir-demo-77a8d.firebasestorage.app",
    messagingSenderId: "495286033335",
    appId: "1:495286033335:web:1fe333b51b6b5c94e1a632"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);