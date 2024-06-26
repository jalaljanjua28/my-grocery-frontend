import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./FirebaseConfig.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyD9DNAvs2Ryd-jTweyv2aF7OHegZN0b8JY",
//   authDomain: "my-grocery-home.firebaseapp.com",
//   projectId: "my-grocery-home",
//   storageBucket: "my-grocery-home.appspot.com",
//   messagingSenderId: "888361723877",
//   appId: "1:888361723877:web:930792430b39fbd20df10c",
//   measurementId: "G-QNMK83BJ7K",
// };

console.log("API Key:", process.env.FIREBASE_API_KEY);
console.log("Auth Domain:", process.env.FIREBASE_AUTH_DOMAIN);
console.log("Project ID:", process.env.FIREBASE_PROJECT_ID);
console.log("Storage Bucket:", process.env.FIREBASE_STORAGE_BUCKET);
console.log("Messaging Sender ID:", process.env.FIREBASE_MESSAGING_SENDER_ID);
console.log("App ID:", process.env.FIREBASE_APP_ID);

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export { firebaseApp, auth, firestore, onAuthStateChanged };
