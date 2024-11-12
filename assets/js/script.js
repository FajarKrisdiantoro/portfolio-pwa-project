'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});



/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});



/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);

  });
}



/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}

// Inisialisasi IndexedDB
function initIndexedDB() {
  return new Promise((resolve, reject) => {
      const request = indexedDB.open('pushSubscriptionDB', 1);

      request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('subscriptions')) {
              db.createObjectStore('subscriptions', { keyPath: 'id', autoIncrement: true });
          }
      };

      request.onsuccess = (event) => {
          resolve(event.target.result);
      };

      request.onerror = (event) => {
          reject(event.target.error);
      };
  });
}

// Fungsi untuk menyimpan data ke IndexedDB
async function saveSubscriptionData(username, token) {
  const db = await initIndexedDB();
  const transaction = db.transaction('subscriptions', 'readwrite');
  const store = transaction.objectStore('subscriptions');

  const data = { username, token };
  store.add(data);

  transaction.oncomplete = () => {
      console.log('Data langganan berhasil disimpan ke IndexedDB.');
  };

  transaction.onerror = (event) => {
      console.error('Gagal menyimpan data langganan:', event.target.error);
  };
}

// Contoh subscribe push notification
async function subscribeUser() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'PUBLIC_KEY_HERE'
  });

  const token = subscription.endpoint;
  const username = prompt('Masukkan nama Anda untuk langganan:');

  // Simpan data ke IndexedDB
  await saveSubscriptionData(username, token);

  console.log('Pengguna berlangganan dengan token:', token);
}
// Inisialisasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAQDMo-nCTNjYcb6oKI4LoJf5UarlyE3U0",
  authDomain: "fajarportfolio-49b03.firebaseapp.com",
  projectId: "fajarportfolio-49b03",
  storageBucket: "fajarportfolio-49b03.firebasestorage.app",
  messagingSenderId: "220469848492",
  appId: "1:220469848492:web:03461dd9eb84a3a89d3209",
};

firebase.initializeApp(firebaseConfig);

// Inisialisasi Firebase Messaging
const messaging = firebase.messaging();

// Minta izin pengguna untuk menerima notifikasi
async function requestPermission() {
  try {
      await Notification.requestPermission();
      const token = await messaging.getToken();
      console.log('Push token:', token);
  } catch (error) {
      console.error('Gagal mendapatkan izin notifikasi:', error);
  }
}

// Panggil fungsi saat pengguna berlangganan
requestPermission();
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging.js')
      .then((registration) => {
          console.log('Service Worker terdaftar:', registration);
          messaging.useServiceWorker(registration);
      })
      .catch((error) => {
          console.error('Service Worker gagal didaftarkan:', error);
      });
}
