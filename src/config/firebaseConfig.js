// src/config/firebaseConfig.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Importação do Firebase Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyB2Ib2qYKM90lriMul8a4R8kCDG4JWuRYM",
  authDomain: "penha-apk.firebaseapp.com",
  projectId: "penha-apk",
  storageBucket: "penha-apk.appspot.com",
  messagingSenderId: "99212239003",
  appId: "1:99212239003:web:fb271086419fb92e63663e",
  measurementId: "G-KND43KNMFB"
};

let app;
let auth;
let db;
let storage;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  db = getFirestore(app);
  storage = getStorage(app); // Inicialização do Firebase Storage
} else {
  app = getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app); // Inicialização do Firebase Storage
}

export { auth, db, storage };
