// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyChKIUsfhBnyrm9n6wUAN133T76h8JLzL0",
  authDomain: "flymate-a11b8.firebaseapp.com",
  projectId: "flymate-a11b8",
  storageBucket: "flymate-a11b8.appspot.com",
  messagingSenderId: "803324446340",
  appId: "1:803324446340:web:b1374588f54dbbde04e4d1",
  measurementId: "G-VF3YXBFTBH"
};

// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}



export{firebase}