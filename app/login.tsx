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
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useMutation } from '@apollo/client';
import loginMutation from '@/graphql/mutations/login.js';
import passwordResetRequestMutation from '@/graphql/mutations/passwordResetRequest.js';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [login, { loading }] = useMutation(loginMutation);
  const [passwordResetRequest] = useMutation(passwordResetRequestMutation);

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { email, password } });
      console.log('Response:', data);
  
      if (data?.signIn?.token) { // เปลี่ยนชื่อจาก login เป็น signIn
        await AsyncStorage.setItem('userToken', data.signIn.token);
        router.replace('/');
      } else {
        Alert.alert('Login Failed', 'Invalid email or password.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Login Error', 'Something went wrong, please try again');
    }
   
  };
  
  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Enter Email', 'Please enter your email to reset your password');
      return;
    }

    try {
      await passwordResetRequest({ variables: { email } });
      Alert.alert('Password Reset', 'A password reset link has been sent to your email');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to send reset link. Please try again.');
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
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.loginButtonText}>{loading ? 'Logging in...' : 'Login'}</Text>
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
