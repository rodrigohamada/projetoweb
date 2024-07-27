// env.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCP7lT8_DmCoc6C6CnfGmGPmOZA5U3sLAE",
    authDomain: "organiccestas.firebaseapp.com",
    projectId: "organiccestas",
    storageBucket: "organiccestas.appspot.com",
    messagingSenderId: "973160253132",
    appId: "1:973160253132:web:a8317e5fb9ed38b5682469"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exportando auth e db para uso em outros módulos
export { auth, db };
