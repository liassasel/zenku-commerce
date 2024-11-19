import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDvbKVM5kdMaf__X0Ien4brdmAmgiv9yWQ",
    authDomain: "zenku-3035d.firebaseapp.com",
    projectId: "zenku-3035d",
    storageBucket: "zenku-3035d.firebasestorage.app",
    messagingSenderId: "454252280990",
    appId: "1:454252280990:web:7ef8559f87ee22e0b34f8f",
    measurementId: "G-VYZVNWS95Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

if (typeof window !== 'undefined') {
    const analytics = getAnalytics(app);
}

export default app;