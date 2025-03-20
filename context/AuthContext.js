import { createContext, useState, useEffect } from 'react';
import { initializeApp } from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyANTo6Y9YNxZTnRrXdmZtWBLgqAvLY9GFg",
    authDomain: "parkrun-th.firebaseapp.com",
    databaseURL: "https://parkrun-th.firebaseio.com",
    projectId: "parkrun-th",
    storageBucket: "parkrun-th.appspot.com",
    messagingSenderId: "473144066166",
    appId: "1:473144066166:web:20edcc7ad59d4c891cdf57",
    measurementId: "G-DWLE7ZRBM0"
};

const app = initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setUser(token ? { token } : null);
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
