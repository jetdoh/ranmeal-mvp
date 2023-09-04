import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAiamtnh3p-nR2v7qzo54bs0iI0LiHwwxc",
    authDomain: "ranmeal-mvp-1b180.firebaseapp.com",
    projectId: "ranmeal-mvp-1b180",
    storageBucket: "ranmeal-mvp-1b180.appspot.com",
    messagingSenderId: "245634524808",
    appId: "1:245634524808:web:6547ab409091a2e5c7e13d",
    measurementId: "G-LWJR6PYJC5"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();
export const database = getFirestore(app);
export const auth = getAuth(app);
