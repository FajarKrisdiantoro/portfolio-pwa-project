
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
  