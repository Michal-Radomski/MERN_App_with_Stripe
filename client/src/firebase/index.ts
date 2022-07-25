//* For Version 9
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

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

interface CustomError {
  message: string;
}

const createUserProfileDocument = async (
  userAuth: {
    multiFactor: any;
    uid?: string;
    displayName?: string;
    email?: string;
  },
  additionalData: firebase.firestore.DocumentData
) => {
  if (!userAuth) {
    return null;
  }

  const userRef = firestore.doc(`users/${userAuth.multiFactor.user.uid}`); // e.g. users/uniq12345

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;

    const createdAt = new Date();

    try {
      await userRef.set({displayName, email, createdAt, ...additionalData});
    } catch (error) {
      console.log("Error Creating User", (error as CustomError).message);
    }
  }

  return userRef;
};

export {firestore, createUserProfileDocument, auth};

//* For version 8
// import firebase from "firebase/app";
// import "firebase/firestore"; // For the FireStore DB
// import "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyC-6INXt6rJJR7noEXdan33HQ2e1SnkV9g",
//   authDomain: "mern-bags-store.firebaseapp.com",
//   projectId: "mern-bags-store",
//   storageBucket: "mern-bags-store.appspot.com",
//   messagingSenderId: "873365510944",
//   appId: "1:873365510944:web:a5f34691a5e5c079a41545",
// };

// firebase.initializeApp(firebaseConfig);

// const firestore = firebase.firestore();
// const auth = firebase.auth();

// interface CustomError {
//   message: string;
// }

// const createUserProfileDocument = async (
//   userAuth: {uid?: string; displayName?: string; email?: string},
//   additionalData: firebase.firestore.DocumentData
// ) => {
//   console.log({userAuth, additionalData});

//   if (!userAuth) {
//     return null;
//   }

//   const userRef = firestore.doc(`users/${userAuth.uid}`); // e.g. users/uniq12345
//   const snapShot = await userRef.get();

//   if (!snapShot.exists) {
//     const {displayName, email} = userAuth;
//     const createdAt = new Date();

//     try {
//       await userRef.set({
//         displayName: displayName,
//         email: email,
//         createdAt: createdAt,
//         ...additionalData,
//       });
//     } catch (error) {
//       console.log("error creating user", (error as CustomError).message);
//     }
//   }
//   return userRef;
// };

// export {firestore, createUserProfileDocument, auth};
