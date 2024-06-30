// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlH8VqADMo63R_iN0JhPPlyLMlh9KRhfs",
  authDomain: "learningdestiny-97f0f.firebaseapp.com",
  projectId: "learningdestiny-97f0f",
  storageBucket: "learningdestiny-97f0f.appspot.com",
  messagingSenderId: "163247025581",
  appId: "1:163247025581:web:88ef990bf7a01ff9714524",
  measurementId: "G-GMX08RK8BE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);