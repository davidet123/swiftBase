// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKMB9jJ3YgSg57xNQ0-aWoHmg2jp_VjN8",
  authDomain: "swiftbase-1553c.firebaseapp.com",
  projectId: "swiftbase-1553c",
  storageBucket: "swiftbase-1553c.appspot.com",
  messagingSenderId: "1089316908685",
  appId: "1:1089316908685:web:e08e35085501e9c84e7cc4"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// init firebase
initializeApp(firebaseConfig)

// init firestore service
const db = getFirestore()
export default db