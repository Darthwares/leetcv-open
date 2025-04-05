import { fallBackConfig } from "./firebase-config";
import { getFirestore } from "firebase/firestore";
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";

let app: FirebaseApp | null = null;

app = initializeApp(
  (JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG!) as FirebaseOptions) ??
    fallBackConfig
);

export default app;

export const db = getFirestore(app);
