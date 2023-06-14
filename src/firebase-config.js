// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from"@firebase/firestore"
import { getAuth} from "@firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8IIrpamgwjWb8HUIO1_iLJjOPSqiDkMY",
  authDomain: "glovo-20be7.firebaseapp.com",
  projectId: "glovo-20be7",
  storageBucket: "glovo-20be7.appspot.com",
  messagingSenderId: "732269454593",
  appId: "1:732269454593:web:a9ce2d5cce986a3679e700"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)


