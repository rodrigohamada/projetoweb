import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
