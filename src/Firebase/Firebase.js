
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAi30WJommVBPDIAw8MWDXnJ-A-mqLw2C8",
    authDomain: "instagramclone-78258.firebaseapp.com",
    projectId: "instagramclone-78258",
    storageBucket: "instagramclone-78258.appspot.com",
    messagingSenderId: "711984621474",
    appId: "1:711984621474:web:b4f76459c51a276a2734fb",
    measurementId: "G-HG82CF9X04"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { app, auth, firestore, storage };