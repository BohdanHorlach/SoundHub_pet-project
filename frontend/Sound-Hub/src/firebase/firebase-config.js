// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: "sound-hub-pet-project.firebaseapp.com",
  projectId: "sound-hub-pet-project",
  storageBucket: "sound-hub-pet-project.firebasestorage.app",
  messagingSenderId: "537070686056",
  appId: "1:537070686056:web:8df12a0caf1ffeb1d090dd",
  measurementId: "G-7HRJMD01KW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };