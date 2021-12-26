import firebase from "firebase/app";
import "firebase/firestore"; // database
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA9aLyYE0F6QJNTnPtskDw8Ar0LtWP4WXE",
  authDomain: "crwn-db-f0700.firebaseapp.com",
  projectId: "crwn-db-f0700",
  storageBucket: "crwn-db-f0700.appspot.com",
  messagingSenderId: "436552231470",
  appId: "1:436552231470:web:30b8345dda9ec738888dbf",
  measurementId: "G-Q6DBGZV9VV",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;