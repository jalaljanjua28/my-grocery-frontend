import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./FirebaseConfig.js";

console.log("API Key:", process.env.VUE_APP_FIREBASE_API_KEY);
console.log("Auth Domain:", process.env.VUE_APP_FIREBASE_AUTH_DOMAIN);
console.log("Project ID:", process.env.VUE_APP_FIREBASE_PROJECT_ID);
console.log("Storage Bucket:", process.env.VUE_APP_FIREBASE_STORAGE_BUCKET);
console.log(
  "Messaging Sender ID:",
  process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
);
console.log("App ID:", process.env.VUE_APP_FIREBASE_APP_ID);

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export { firebaseApp, auth, firestore, onAuthStateChanged };
