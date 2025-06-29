// Import the functions you need from the SDKs you need
import { type FirebaseApp, initializeApp } from "firebase/app";
import { type Auth, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTKEmjFzQE-gAmwKU0SHwGM09X5nG3Hxs",
  authDomain: "devhub-b0261.firebaseapp.com",
  projectId: "devhub-b0261",
  storageBucket: "devhub-b0261.firebasestorage.app",
  messagingSenderId: "781167573046",
  appId: "1:781167573046:web:65fe5f3b2cca79b4898097",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth: Auth = getAuth(app);
