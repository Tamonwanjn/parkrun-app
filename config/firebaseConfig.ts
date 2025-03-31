// import { initializeApp } from "firebase/app";
// // import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: 'AIzaSyANTo6Y9YNxZTnRrXdmZtWBLgqAvLY9GFg',
//   authDomain: 'parkrun-th.firebaseapp.com',
//   projectId: 'parkrun-th',
//   storageBucket: 'parkrun-th.appspot.com',
//   messagingSenderId: '473144066166',
//   appId: '1:473144066166:web:20edcc7ad59d4c891cdf57',
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// export { app, auth };







// src/config/firebaseConfig.ts

// import { initializeApp } from "firebase/app";
// import { getAuth, connectAuthEmulator } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyC7UhzgQV_lihPiow_0tk6gt4oR4tB9wys",
//   authDomain: "parkrun-th.firebaseapp.com",
//   projectId: "parkrun-th",
//   storageBucket: "parkrun-th.appspot.com",
//   messagingSenderId: "473144066166",
//   appId: "1:473144066166:android:f4de4995ff0c05141cdf57"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // ✅ เชื่อมกับ Auth Emulator ตอน dev เท่านั้น
// if (__DEV__) {
//     connectAuthEmulator(auth, "http://localhost:9099");
// }

// export { auth };







// import { initializeApp } from "firebase/app";
// import { 
//   initializeAuth, 
//   connectAuthEmulator,
//   getReactNativePersistence 
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

// const app = initializeApp(firebaseConfig);

// // ✅ ใช้ initializeAuth พร้อม AsyncStorage
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// });

// // ✅ Emulator connect เฉพาะ dev
// if (__DEV__ && !auth.emulatorConfig) {
//     connectAuthEmulator(auth, "http://192.168.1.138:9099");
//     console.log("✅ Auth emulator connected");
// }

// export { auth };


// import { initializeApp } from "firebase/app";
// import { 
//   initializeAuth, 
//   connectAuthEmulator,
//   getReactNativePersistence 
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

// const app = initializeApp(firebaseConfig);

// // ✅ ใช้ initializeAuth พร้อม AsyncStorage
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// });

// // ✅ Emulator connect เฉพาะ dev
// if (__DEV__ && !auth.emulatorConfig) {
//     // For Android emulator use 10.0.2.2 instead of localhost
//     connectAuthEmulator(auth, "http://10.0.2.2:9099", { disableWarnings: false });
//     console.log("✅ Auth emulator connected");
// }

// export { auth };

import { initializeApp } from "firebase/app";
import { 
  initializeAuth, 
  connectAuthEmulator,
  getReactNativePersistence,
  getAuth
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7UhzgQV_lihPiow_0tk6gt4oR4tB9wys",
  authDomain: "parkrun-th.firebaseapp.com",
  projectId: "parkrun-th",
  storageBucket: "parkrun-th.appspot.com",
  messagingSenderId: "473144066166",
  appId: "1:473144066166:android:f4de4995ff0c05141cdf57"
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.log("Firebase app เริ่มต้นไปแล้ว");
}

let auth;
try {
  auth = getAuth(app);
} catch (error) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

if (__DEV__ && !auth.emulatorConfig) {
    connectAuthEmulator(auth, "http://10.0.2.2:9099", { disableWarnings: false });
    console.log("Auth emulator connected");
}

export { auth };