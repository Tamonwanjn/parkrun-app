// import React, { useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Pressable,
//   Alert,
//   ScrollView,
//   Dimensions,
//   Platform,
// } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import { useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Ionicons as Icon } from '@expo/vector-icons';
// import getUserOne from "@/graphql/queries/getUserOne";
// import getUserByEmail from '@/graphql/queries/getUserByEmail';
// import { useLazyQuery } from '@apollo/client';
// import api from '@graphql/api';

// // รับค่าความสูงของหน้าจอ
// const { height } = Dimensions.get('window');


// export default function LoginScreen() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [getUser, { data, loading, error }] = useLazyQuery(getUserByEmail);


//   const handleLogin = async () => {
//     await AsyncStorage.removeItem("userToken");
//     if (email === 'admin' && password === '123456') {
//       const token = '123456abcdef';
//       await AsyncStorage.setItem('userToken', token);
//       router.replace('/');
//     } else {
//       Alert.alert('Login Failed', 'Invalid email or password');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar style="dark" />
      
//       <ScrollView 
//         contentContainerStyle={{ height: height }} 
//         keyboardShouldPersistTaps="always"
//         scrollEnabled={false}
//       >
//         <SafeAreaView style={styles.safeArea}>
//           {/* Logo Section */}
//           <View style={styles.logoContainer}>
//             <Image
//               source={require("../assets/images/parkrunlogo.png")}
//               style={styles.logo}
//               resizeMode="contain"
//             />
//           </View>

//           {/* Login Form */}
//           <View style={styles.formContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your email"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPassword(!showPassword)}
//                 style={styles.eyeIcon}
//               >
//                 <Icon name={showPassword ? "eye" : "eye-off"} size={24} color="#666" />
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity style={styles.resetpassword}>
//               <Text style={styles.resetpasswordText}>Forgot Password?</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//               <Text style={styles.loginButtonText}>Login</Text>
//             </TouchableOpacity>
//           </View>

//           {/* แสดง Register Container แบบ fixed ที่ด้านล่าง */}
//           {/* <View style={styles.registerContainer}>
//             <Text style={styles.registerText}>Don't have an account? </Text>
//             <Pressable onPress={() => router.push('/register')}>
//               <Text style={styles.registerLink}>Register Now</Text>
//             </Pressable>
//           </View> */}
//         </SafeAreaView>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   safeArea: {
//     flex: 1,
//     padding: 20,
//     position: 'relative',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginTop: Platform.OS === 'ios' ? 80 : 40,
//     marginBottom: 40,
//   },
//   logo: {
//     width: 180,
//     height: 180,
//   },
//   formContainer: {
//     width: '100%',
//   },
//   input: {
//     backgroundColor: '#F8F9FA',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8F9FA',
//     borderRadius: 12,
//     marginBottom: 15,
//   },
//   passwordInput: {
//     flex: 1,
//     padding: 15,
//     fontSize: 16,
//   },
//   eyeIcon: {
//     padding: 15,
//   },
//   resetpassword: {
//     alignSelf: 'flex-end',
//     marginBottom: 20,
//   },
//   resetpasswordText: {
//     color: '#666',
//     fontSize: 16,
//   },
//   loginButton: {
//     backgroundColor: '#249781',
//     borderRadius: 12,
//     padding: 16,
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   registerContainer: {
//     position: 'absolute',
//     bottom: Platform.OS === 'ios' ? 40 : 20,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   registerText: {
//     color: '#666',
//     fontSize: 16,
//   },
//   registerLink: {
//     color: '#249781',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });







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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useLazyQuery, useMutation } from '@apollo/client';
import loginMutation from '@/graphql/mutations/login.js';
import getUserByEmail from '@/graphql/queries/getUserByEmail.js';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [fetchUser, { loading: fetchingUser }] = useLazyQuery(getUserByEmail);
  const [login, { loading: loggingIn }] = useMutation(loginMutation);

  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     Alert.alert('Error', 'Please enter your email and password.');
  //     return;
  //   }

  //   try {
  //     // 1. ค้นหา _id ของ user จาก email
  //     const { data } = await fetchUser({ variables: { email } });

  //     if (!data?.userOne?._id) {
  //       Alert.alert('Error', 'User not found.');
  //       return;
  //     }

  //     const userId = data.userOne._id;

  //     // 2. ทำการ login โดยใช้ userId + password
  //     const { data: loginData } = await login({ variables: { _id: userId, password } });

  //     if (loginData?.login?.token) {
  //       await AsyncStorage.setItem('authToken', loginData.login.token);
  //       router.replace('/'); // เปลี่ยนไปหน้าหลักหลังจาก login สำเร็จ
  //     } else {
  //       Alert.alert('Error', 'Invalid email or password.');
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     Alert.alert('Error', 'Failed to log in. Please try again.');
  //   }
  // };

  const handleLogin = async () => {
        await AsyncStorage.removeItem("userToken");
        if (email === 'admin' && password === '123456') {
          const token = '123456abcdef';
          await AsyncStorage.setItem('userToken', token);
          router.replace('/');
        } else {
          Alert.alert('Login Failed', 'Invalid email or password');
        }
      };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/parkrunlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={fetchingUser || loggingIn}>
          <Text style={styles.loginButtonText}>{(fetchingUser || loggingIn) ? 'Logging in...' : 'Login'}</Text>
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
    alignItems: 'center',
  },
  resetpasswordText: {
    color: '#249781',
    fontSize: 16,
  },
});
