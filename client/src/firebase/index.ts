import firebase from "firebase/app";
import "firebase/firestore"; // For the FireStore DB
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-6INXt6rJJR7noEXdan33HQ2e1SnkV9g",
  authDomain: "mern-bags-store.firebaseapp.com",
  projectId: "mern-bags-store",
  storageBucket: "mern-bags-store.appspot.com",
  messagingSenderId: "873365510944",
  appId: "1:873365510944:web:a5f34691a5e5c079a41545",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();

export {firestore, auth};
