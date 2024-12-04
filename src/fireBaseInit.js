import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDXPj6KoHnzyBt4MENWB29XupNG7CsDr8Q",
    authDomain: "busybuyone-fc874.firebaseapp.com",
    projectId: "busybuyone-fc874",
    storageBucket: "busybuyone-fc874.firebasestorage.app",
    messagingSenderId: "693000435870",
    appId: "1:693000435870:web:8fb60dcd963c9c8f50238f",
    measurementId: "G-W8KSXKKQK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app);
