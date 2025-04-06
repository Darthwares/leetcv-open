import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp as initializeAdminApp } from "firebase-admin/app";
import { getFirestore as getAdminFirestore } from "firebase-admin/firestore";
import { cert } from "firebase-admin/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase client
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Firebase Admin
let adminApp;
let adminDb;

if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  try {
    // Only initialize in server context
    if (typeof window === 'undefined') {
      if (!getApps().length) {
        adminApp = initializeAdminApp({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          credential: cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          }),
        });
      } else {
        adminApp = getApp();
      }
      adminDb = getAdminFirestore();
    }
  } catch (error) {
    console.error("Firebase admin initialization error", error);
    // Fallback for builds
    adminDb = {};
  }
}

export { app, db, auth, adminDb };