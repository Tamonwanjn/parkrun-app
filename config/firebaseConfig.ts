// import { initializeApp } from "firebase/app";
// import { 
//   initializeAuth, 
//   connectAuthEmulator,
//   getReactNativePersistence,
//   getAuth
// } from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyC7UhzgQV_lihPiow_0tk6gt4oR4tB9wys",
//   authDomain: "parkrun-th.firebaseapp.com",
//   projectId: "parkrun-th",
//   storageBucket: "parkrun-th.appspot.com",
//   messagingSenderId: "473144066166",
//   appId: "1:473144066166:android:f4de4995ff0c05141cdf57"
// };

// let app;
// try {
//   app = initializeApp(firebaseConfig);
// } catch (error) {
//   console.log("Firebase app เริ่มต้นไปแล้ว");
// }

// let auth;
// try {
//   auth = getAuth(app);
// } catch (error) {
//   auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage)
//   });
// }

// if (__DEV__ && !auth.emulatorConfig) {
//     connectAuthEmulator(auth, "http://10.0.2.2:9099", { disableWarnings: false });
//     console.log("Auth emulator connected");
// }

// export { auth };



// import { initializeApp, getApps } from "firebase/app";
// import { 
//   initializeAuth, 
//   connectAuthEmulator,
//   getReactNativePersistence,
//   getAuth
// } from "firebase/auth";
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyC7UhzgQV_lihPiow_0tk6gt4oR4tB9wys",
//   authDomain: "parkrun-th.firebaseapp.com",
//   projectId: "parkrun-th",
//   storageBucket: "parkrun-th.appspot.com",
//   messagingSenderId: "473144066166",
//   appId: "1:473144066166:android:f4de4995ff0c05141cdf57"
// };

// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

// if (__DEV__ && !auth.emulatorConfig) {
//     connectAuthEmulator(auth, "http://10.0.2.2:9099", { disableWarnings: false });
//     console.log("Auth emulator connected");
// }

// export { auth };


import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyC7UhzgQV_lihPiow_0tk6gt4oR4tB9wys",
  authDomain: "parkrun-th.firebaseapp.com",
  projectId: "parkrun-th",
  storageBucket: "parkrun-th.appspot.com",
  messagingSenderId: "473144066166",
  appId: "1:473144066166:android:f4de4995ff0c05141cdf57"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);

if (__DEV__ && !auth.emulatorConfig) {
    const host = Platform.OS === "web" ? "localhost" : "10.0.2.2";
    connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: false });
    console.log("Auth emulator connected");
}

export { auth };
