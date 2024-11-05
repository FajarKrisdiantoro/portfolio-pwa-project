// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBwNJqVJRs5R921h12ZKa8bYpPuZDcUJgw",
  authDomain: "portfolio-fajar.firebaseapp.com",
  projectId: "portfolio-fajar",
  storageBucket: "portfolio-fajar.firebasestorage.app",
  messagingSenderId: "828821200780",
  appId: "1:828821200780:web:075fd12fc0a61a084c40a9",
  measurementId: "G-WN34E38VVN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
