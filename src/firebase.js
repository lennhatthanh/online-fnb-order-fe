import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBSmhE98-F97uRr5SfwQR0xIO1u1H1trs8",
    authDomain: "fooddelivery-f3fc2.firebaseapp.com",
    projectId: "fooddelivery-f3fc2",
    storageBucket: "fooddelivery-f3fc2.firebasestorage.app",
    messagingSenderId: "830052901332",
    appId: "1:830052901332:web:11757c109ba082c11e3641",
    measurementId: "G-YJS9H09TG7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
