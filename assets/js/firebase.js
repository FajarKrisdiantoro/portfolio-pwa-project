import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
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
