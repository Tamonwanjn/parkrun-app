// import React, { useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Alert,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons as Icon } from '@expo/vector-icons';
// import { useLazyQuery, useMutation } from '@apollo/client';
// import loginMutation from '@/graphql/mutations/login.js';
// import getUserByEmail from '@/graphql/queries/getUserByEmail.js';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '@/config/firebaseConfig';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function LoginScreen() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const [fetchUser, { loading: fetchingUser }] = useLazyQuery(getUserByEmail);
//   const [login, { loading: loggingIn }] = useMutation(loginMutation);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'กรุณากรอกอีเมลและรหัสผ่าน');
//       return;
//     }

//     try {
//       // ✅ Firebase login
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // ✅ เก็บ token ลง AsyncStorage (optional)
//       const token = await user.getIdToken();
//       await AsyncStorage.setItem('userToken', token);

//       Alert.alert('Success', 'ล็อกอินสำเร็จ');
//       router.replace('/');
//     } catch (error: any) {
//       if (error.code === 'auth/user-not-found') {
//         Alert.alert('Error', 'ไม่มีอีเมลนี้ในระบบ');
//       } else if (error.code === 'auth/wrong-password') {
//         Alert.alert('Error', 'รหัสผ่านไม่ถูกต้อง');
//       } else if (error.code === 'auth/network-request-failed') {
//         Alert.alert('Error', 'โปรดตรวจสอบอินเทอร์เน็ตของท่าน');
//       } else {
//         Alert.alert('Error', error.message);
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.logoContainer}>
//         <Image
//           source={require('../assets/images/parkrunlogo.png')}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//       </View>

//       <View style={styles.formContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />

//         <View style={styles.passwordContainer}>
//           <TextInput
//             style={styles.passwordInput}
//             placeholder="Enter your password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry={!showPassword}
//           />
//           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//             <Icon name={showPassword ? 'eye' : 'eye-off'} size={24} color="#666" />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity
//           style={styles.loginButton}
//           onPress={handleLogin}
//           disabled={fetchingUser || loggingIn}
//         >
//           <Text style={styles.loginButtonText}>
//             {(fetchingUser || loggingIn) ? 'Logging in...' : 'Login'}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.resetpassword} onPress={() => router.push('/resetpassword')}>
//           <Text style={styles.resetpasswordText}>ลืมรหัสผ่าน?</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginVertical: 40,
//   },
//   logo: {
//     width: 180,
//     height: 180,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8F9FA',
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     marginBottom: 20,
//   },
//   formContainer: {
//     paddingHorizontal: 20,
//   },
//   input: {
//     fontSize: 16,
//     paddingVertical: 15,
//     backgroundColor: '#F8F9FA',
//     borderRadius: 12,
//     marginBottom: 20,
//     paddingHorizontal: 15,
//   },
//   passwordInput: {
//     flex: 1,
//     fontSize: 16,
//     paddingVertical: 15,
//   },
//   loginButton: {
//     backgroundColor: '#249781',
//     borderRadius: 12,
//     paddingVertical: 15,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   resetpassword: {
//     marginTop: 15,
//     alignItems: 'flex-end',
//   },
//   resetpasswordText: {
//     color: '#249781',
//     fontSize: 16,
//   },
// });


// ******************************************** แบบแก้ Domain ********************************************


// ******************************************** อีกทางเลือก********************************************

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useLazyQuery, useMutation } from '@apollo/client';
import loginMutation from '@/graphql/mutations/login.js';
import getUserByEmail from '@/graphql/queries/getUserByEmail.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fetchUser, { data: userData }] = useLazyQuery(getUserByEmail);
  

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }
  
    try {
      // ล็อคอินด้วย Firebase ก่อน
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // เรียก GraphQL query ตรวจสอบ email กับฐานข้อมูล
      const { data } = await fetchUser({ variables: { email } });
  
      console.log('GraphQL response:', data);
  
      if (data?.userOne?._id) {
        console.log(`Email ${email} ตรงกับ _id: ${data.userOne._id}`);
        
        // ✅ เก็บ userId ลง AsyncStorage
        await AsyncStorage.setItem('userId', data.userOne._id);
      } else {
        Alert.alert('Error', 'ไม่พบข้อมูลผู้ใช้จากอีเมลนี้ในระบบ');
        return; // หากไม่มี userId ให้หยุดฟังก์ชัน
      }
  
      Alert.alert('สำเร็จ', 'ล็อคอินสำเร็จ');
      router.replace('/'); // ไปหน้าหลัก
  
    } catch (error: any) {
      console.log('Login error:', error);
      let errorMessage = 'เกิดข้อผิดพลาด กรุณาลองใหม่';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'ไม่พบผู้ใช้นี้ในระบบ';
          break;
        case 'auth/wrong-password':
          errorMessage = 'รหัสผ่านไม่ถูกต้อง';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต';
          break;
      }
      Alert.alert('Error', errorMessage);
    }
  };  


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/parkrunlogo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye' : 'eye-off'} size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetpassword} onPress={() => router.push('/resetpassword')}>
          <Text style={styles.resetpasswordText}>ลืมรหัสผ่าน?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  logo: {
    width: 180,
    height: 180,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  input: {
    fontSize: 16,
    paddingVertical: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 15,
  },
  loginButton: {
    backgroundColor: '#249781',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  resetpassword: {
    marginTop: 15,
    alignItems: 'flex-end',
  },
  resetpasswordText: {
    color: '#249781',
    fontSize: 16,
  },
});
