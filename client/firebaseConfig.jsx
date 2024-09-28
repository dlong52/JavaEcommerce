// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDbAZBt4Zg-zj9stpyspNDzC63ZygGgDA",
  authDomain: "ecommerce-project-d8113.firebaseapp.com",
  projectId: "ecommerce-project-d8113",
  storageBucket: "ecommerce-project-d8113.appspot.com",
  messagingSenderId: "203719623652",
  appId: "1:203719623652:web:8e56078873132ad907bdf1",
  measurementId: "G-Q54GC6RBFL"
};


const app = initializeApp(firebaseConfig);

export const storage  = getStorage(app)