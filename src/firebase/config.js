import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/compat/storage';

const firebaseConfig = {
apiKey: "AIzaSyAe0cdFlPW-MZ88b-zKQ09o4NPo3OMdZ5s",
authDomain: "fir-a7103.firebaseapp.com",
projectId: "fir-a7103",
storageBucket: "fir-a7103.appspot.com",
messagingSenderId: "1066045384544",
appId: "1:1066045384544:web:c620c7f796d2eadf3fa005",
measurementId: "G-HYT50R4TNQ",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage(); // Initialize Firebase Storage


export  { db, auth,storage };