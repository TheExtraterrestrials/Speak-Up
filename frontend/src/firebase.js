// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCQjhV97mv9sn-2xa0XIVVwGwp-J3IgGeY",
    authDomain: "speak-up-3948b.firebaseapp.com",
    projectId: "speak-up-3948b",
    storageBucket: "speak-up-3948b.appspot.com",
    messagingSenderId: "941927849923",
    appId: "1:941927849923:web:9167e73ddf9183e79ba776",
    measurementId: "G-B2C412V5ZH"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider, signInWithPopup };
