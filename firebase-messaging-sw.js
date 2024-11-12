// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQDMo-nCTNjYcb6oKI4LoJf5UarlyE3U0",
  authDomain: "fajarportfolio-49b03.firebaseapp.com",
  projectId: "fajarportfolio-49b03",
  storageBucket: "fajarportfolio-49b03.firebasestorage.app",
  messagingSenderId: "220469848492",
  appId: "1:220469848492:web:03461dd9eb84a3a89d3209",
  measurementId: "G-N3JP2HCLJY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);