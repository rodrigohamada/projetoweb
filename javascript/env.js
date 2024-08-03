import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js';

const firebaseConfig = {
    apiKey: "AIzaSyCP7lT8_DmCoc6C6CnfGmGPmOZA5U3sLAE",
    authDomain: "organiccestas.firebaseapp.com",
    projectId: "organiccestas",
    storageBucket: "organiccestas.appspot.com",
    messagingSenderId: "973160253132",
    appId: "1:973160253132:web:a8317e5fb9ed38b5682469"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
