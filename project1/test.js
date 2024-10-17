import { initializeApp } from "htt";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp();

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("login in!");
  } else {
    console.log("no user!");
  }
});
