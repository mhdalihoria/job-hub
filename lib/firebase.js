import { getApps, initializeApp } from 'firebase/app';
import 'firebase/firestore';
import "firebase/storage"
import "firebase/auth"
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl_zipPqmOU-QRikEjnNlLq7lPYUEpIo4",
  authDomain: "job-hub-42069.firebaseapp.com",
  projectId: "job-hub-42069",
  storageBucket: "job-hub-42069.appspot.com",
  messagingSenderId: "895515432687",
  appId: "1:895515432687:web:1dcfa7e04c0e8664baad1a"
};

 
if (!getApps.length) {
    initializeApp(firebaseConfig);
  }

export const auth = getAuth()
export const firestore = getFirestore();
// export const storage = firebase.storage()

