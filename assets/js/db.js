// src/db.js
const dbPromise = indexedDB.open("notificationsDB", 1);

dbPromise.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore("tokens", { keyPath: "username" });
};

// Fungsi untuk menyimpan data token pengguna
export function saveTokenLocally(username, token) {
    return new Promise((resolve, reject) => {
        const db = dbPromise.result;
        const transaction = db.transaction("tokens", "readwrite");
        const store = transaction.objectStore("tokens");
        store.put({ username, token });
        transaction.oncomplete = () => resolve();
        transaction.onerror = (e) => reject(e);
    });
}

// Fungsi untuk mendapatkan data token pengguna
export function getToken(username) {
    return new Promise((resolve, reject) => {
        const db = dbPromise.result;
        const transaction = db.transaction("tokens", "readonly");
        const store = transaction.objectStore("tokens");
        const request = store.get(username);
        request.onsuccess = () => resolve(request.result ? request.result.token : null);
        request.onerror = (e) => reject(e);
    });
}
