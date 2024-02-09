import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAIHg3pBYmMN4ArBrm-o-cvkLqB7e5Xn7Q",
    authDomain: "iotgonzalo-11160.firebaseapp.com",
    projectId: "iotgonzalo-11160",
    storageBucket: "iotgonzalo-11160.appspot.com",
    messagingSenderId: "113712851434",
    appId: "1:113712851434:web:a765d65d9ffa99bd4e2a93",
    measurementId: "G-WV2W02Q3JP",
  };

//Conectamos con la base de datos
const app = initializeApp(firebaseConfig);
const db = getFirestore()
export const auth = getAuth(app);

export const createUserCredentials = (email, password, displayName) =>
  createUserWithEmailAndPassword(auth, email, password, displayName);

export const signInUserCredentials = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedUser = (callBack) =>
  onAuthStateChanged(auth, callBack);

export const updateData = (id, ref, objeto) => updateDoc(doc(db, ref, id), objeto);

export const saveDataWithId = (ref, id, objeto) => setDoc(doc(db, ref, id), objeto);

export const saveSubCollection = (ref, id, subCollection, objeto) =>
  addDoc(collection(doc(db, ref, id), subCollection), objeto)

export const getSubCollection = (ref, id, subCollection, callBack) =>
onSnapshot(collection(doc(db, ref, id), subCollection), callBack)

export const getDataChanged_collection = (ref, callBack) =>
  onSnapshot(collection(db, ref), callBack)

export const fetchDataFromCollection = (collectionName) => {
  return new Promise((resolve) => {
    getDataChanged_collection(collectionName, (snapshot) => {
      resolve(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    })
  })
}
export const deleteSubCollection = (ref, id, subCollection, subId) =>
  deleteDoc(doc(db, ref, id, subCollection, subId))
