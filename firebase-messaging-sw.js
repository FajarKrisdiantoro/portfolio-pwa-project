importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging.js');

// Inisialisasi Firebase di Service Worker
const firebaseConfig = {
    apiKey: "AIzaSyAQDMo-nCTNjYcb6oKI4LoJf5UarlyE3U0",
  authDomain: "fajarportfolio-49b03.firebaseapp.com",
  projectId: "fajarportfolio-49b03",
  storageBucket: "fajarportfolio-49b03.firebasestorage.app",
  messagingSenderId: "220469848492",
  appId: "1:220469848492:web:03461dd9eb84a3a89d3209",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handler untuk menerima push notifikasi
messaging.onBackgroundMessage((payload) => {
    console.log('Pesan latar belakang diterima:', payload);
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: '/icon.png'
    });
});
