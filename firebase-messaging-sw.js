// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBwNJqVJRs5R921h12ZKa8bYpPuZDcUJgw",
  authDomain: "portfolio-fajar.firebaseapp.com",
  projectId: "portfolio-fajar",
  storageBucket: "portfolio-fajar.firebasestorage.app",
  messagingSenderId: "828821200780",
  appId: "1:828821200780:web:25f555b339eb34f04c40a9",
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
