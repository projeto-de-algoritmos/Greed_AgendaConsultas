// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut} from 'firebase/auth';
import { getFirestore, addDoc, collection, getDocs  } from 'firebase/firestore'
import { date } from "yup";
import firebaseErrors from "./firebaseErros";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDgpAHJEu2Ff7FAzWLHw7pR0d9k4ajEy0",
  authDomain: "clinicschedule-66964.firebaseapp.com",
  projectId: "clinicschedule-66964",
  storageBucket: "clinicschedule-66964.appspot.com",
  messagingSenderId: "195820409150",
  appId: "1:195820409150:web:7d3c6d7bbeedcad52d5c6f"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();

const authetication = {
    handleNewAccount: ( email, password, Success, Failure) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => Success())
        .catch(
            (error) => {
                Failure(firebaseErrors(error.code))
                console.log(error)
            }
        )
        
    },
    resetEmail: (email) => {  
        sendPasswordResetEmail(email)
    },
    logIn: (email, password, Success, Failure) => {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => Success())
        .catch(
            (error) => {
                Failure(firebaseErrors(error.code))
            }
        )
    },
    logOut: (finishSession) => {
        console.log("jlokn")
        console.log(finishSession)
        finishSession?.();
        // signOut();
    }
}

const db = getFirestore();

async function post (user, dateStart, dateEnd, timeSchedule) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
        user: user,
        dateStart: dateStart,
        dateEnd: dateEnd,
        timeSchedule: timeSchedule
        });
        return docRef.id;
      } catch (e) {
        return e;
      }
}

async function postSchedule (user, dateStart, dateEnd) {
    try {
        const docRef = await addDoc(collection(db, "agenda"), {
        user: user,
        dateStart: dateStart,
        dateEnd: dateEnd,
        });
        return docRef.id;
      } catch (e) {
        return e;
      }
}

async function getSchedule(user) {
    const response = [];
    const querySnapshot = await getDocs(collection(db, "agenda"));
    querySnapshot.forEach((doc) => {
        user ? (doc.data().user == user ? response.push(doc.data()): null) : response.push(doc.data());
    });
    return response;
}

async function get (user) {
    const response = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        user ? (doc.data().user == user ? response.push(doc.data()): null) : response.push(doc.data());
    });
    return response;
}


export {authetication, post, get, postSchedule, getSchedule};