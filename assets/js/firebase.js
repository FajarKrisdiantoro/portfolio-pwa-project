import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyBwNJqVJRs5R921h12ZKa8bYpPuZDcUJgw",
  authDomain: "portfolio-fajar.firebaseapp.com",
  projectId: "portfolio-fajar",
  storageBucket: "portfolio-fajar.firebasestorage.app",
  messagingSenderId: "828821200780",
  appId: "1:828821200780:web:25f555b339eb34f04c40a9",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Mendapatkan token untuk mengidentifikasi perangkat pengguna
export const requestForToken = async () => {
    try {
        const currentToken = await getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY' });
        if (currentToken) {
            console.log('Token diperoleh:', currentToken);
            // Simpan token ke Firebase Firestore atau IndexedDB
            return currentToken;
        } else {
            console.log('Tidak dapat mendapatkan token.');
        }
    } catch (error) {
        console.error('Error mengambil token:', error);
    }
};

// Menerima pesan saat aplikasi aktif
onMessage(messaging, (payload) => {
    console.log('Message received:', payload);
    // Tampilkan notifikasi atau update UI
});
