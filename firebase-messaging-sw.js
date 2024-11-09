// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAQDMo-nCTNjYcb6oKI4LoJf5UarlyE3U0",
    authDomain: "fajarportfolio-49b03.firebaseapp.com",
    projectId: "fajarportfolio-49b03",
    storageBucket: "fajarportfolio-49b03.firebasestorage.app",
    messagingSenderId: "220469848492",
    appId: "1:220469848492:web:03461dd9eb84a3a89d3209",
    measurementId: "G-N3JP2HCLJY"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icons/icon-192x192.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
