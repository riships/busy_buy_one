import env from "react-dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: env.FIREBASEAPIKEY,
    authDomain: env.AUTHDOMAIN,
    projectId: env.PROJECTID,
    storageBucket: env.STORAGEBUCKET,
    messagingSenderId: env.MESSAGINGSENDERID,
    appId: env.APPID,
    measurementId: env.MEASUREMENTID
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
const db = getFirestore(app)
export const auth = getAuth(app);

export { db };
