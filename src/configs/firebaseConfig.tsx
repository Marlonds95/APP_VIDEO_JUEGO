// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFsJ7mCM3aTQJsRlMHJoLMjR8Kpdw0BQk",
  authDomain: "video-juego-i.firebaseapp.com",
  projectId: "video-juego-i",
  storageBucket: "video-juego-i.appspot.com",
  messagingSenderId: "283181198797",
  appId: "1:283181198797:web:0ec7f8a7a092c4dd62e884",
  databaseURL: "https://video-juego-i-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

//Referencia al servicio de BDD
export const dbRealTime = getDatabase(firebase);
