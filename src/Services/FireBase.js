// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaPgcPMIka2aWzBdUb4aGZpa5gQjqGOAM",
  authDomain: "tmdb-12.firebaseapp.com",
  projectId: "tmdb-12",
  storageBucket: "tmdb-12.firebasestorage.app",
  messagingSenderId: "695392243779",
  appId: "1:695392243779:web:24669ba703bed313bb44f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= getAuth (app);
