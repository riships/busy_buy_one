import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import env from "react-dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: env.FIREBASEAPIKEY,
    authDomain: "busybuyone-fc874.firebaseapp.com",
    projectId: "busybuyone-fc874",
    storageBucket: "busybuyone-fc874.firebasestorage.app",
    messagingSenderId: "693000435870",
    appId: "1:693000435870:web:8fb60dcd963c9c8f50238f",
    measurementId: "G-W8KSXKKQK9"
};

// Initialize Firebase
let app;
try {
    app = initializeApp(firebaseConfig);
} catch (error) {
    console.error("Firebase initialization error:", error);
}

// const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth();
setPersistence(auth, browserLocalPersistence);

export { db };
