// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBBCnBm73Lv4kDL5JSDj-yPjMj1mgj0cGk',
    authDomain: 'pogo-vault-6c258.firebaseapp.com',
    projectId: 'pogo-vault-6c258',
    storageBucket: 'pogo-vault-6c258.firebasestorage.app',
    messagingSenderId: '626430419850',
    appId: '1:626430419850:web:219086f35a077f714e9e73',
    measurementId: 'G-6X29ESPC6T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
