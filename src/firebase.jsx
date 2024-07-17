// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPgr2ASrQWyLRzoKmSiCGq-WETVTKdR2Y",
  authDomain: "learningdestinyin.firebaseapp.com",
  projectId: "learningdestinyin",
  storageBucket: "learningdestinyin.appspot.com",
  messagingSenderId: "190796637565",
  appId: "1:190796637565:web:407209ce936bdb78645814",
  measurementId: "G-L9N91K4MQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app)
export default app;