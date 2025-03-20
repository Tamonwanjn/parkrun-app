// import app from 'firebase/app'
// import 'firebase/auth'
// // import 'firebase/firebase-firestore'
// import 'firebase/firestore'
// import firebaseConfig from './firebaseConfig.js'
// // const config = {
// //   apiKey: process.env.REACT_APP_FIREBASE_KEY,
// //   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
// //   // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
// //   // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// //   projectId: 'thairun-vr',
// //   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// //   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
// //   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// //   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// // }
// // Initialize Firebase
// class Firebase {
//   constructor() {
//     app.initializeApp(firebaseConfig)
//     this.auth = app.auth()
//     this.db = app.firestore()
//     if (process.env.NODE_ENV === 'development') {
//       this.db.settings({ host: 'localhost:8080', ssl: false })
//     }
//   }
//   login(email, password) {
//     return this.auth.signInWithEmailAndPassword(email, password)
//   }
//   logout() {
//     return this.auth.signOut()
//   }
//   async register(name, email, password, role) {
//     await this.auth.createUserWithEmailAndPassword(email, password)
//     return this.auth.currentUser.updateProfile({
//       displayName: name,
//       ROLE: role,
//     })
//   }
//   getCurrentUsername() {
//     return this.auth.currentUser && this.auth.currentUser.displayName
//   }
//   isInitialized() {
//     return new Promise((resolve) => {
//       this.auth.onAuthStateChanged(resolve)
//     })
//   }
// }
// export default new Firebase()

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "@/config/firebaseConfig"; 
import auth from '@react-native-firebase/auth';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
