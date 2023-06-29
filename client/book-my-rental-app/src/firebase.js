// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhPgcDGSewSK7GwgGmmn--vbbxNQswTTo",
  authDomain: "book-my-rental.firebaseapp.com",
  projectId: "book-my-rental",
  storageBucket: "book-my-rental.appspot.com",
  messagingSenderId: "744291030268",
  appId: "1:744291030268:web:946f06719e2659d39b3379"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
export default app;