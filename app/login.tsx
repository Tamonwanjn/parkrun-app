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
import getUserByEmail from '@/graphql/queries/getUserByEmail.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dialog, Button, Portal } from 'react-native-paper';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fetchUser, { data: userData }] = useLazyQuery(getUserByEmail);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showCustomAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };


  const handleLogin = async () => {
    if (!email || !password) {
      showCustomAlert('Error', 'กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const { data } = await fetchUser({ variables: { email } });

      if (data?.userOne?._id) {
        await AsyncStorage.setItem('userId', data.userOne._id);
      } else {
        showCustomAlert('Error', 'ไม่พบข้อมูลผู้ใช้จากอีเมลนี้ในระบบ');
        return;
      }

      showCustomAlert('สำเร็จ', 'ล็อคอินสำเร็จ');
      setTimeout(() => {
        router.replace('/');
      }, 500);

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
      showCustomAlert('Error', errorMessage);
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
      <Portal>
        <Dialog
          visible={alertVisible}
          onDismiss={() => setAlertVisible(false)}
          style={styles.dialogContainer}
        >
          <Dialog.Title style={styles.dialogTitle}>{alertTitle}</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogContent}>{alertMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            <Button
              mode="contained"
              onPress={() => setAlertVisible(false)}
              style={styles.confirmButton}
              labelStyle={styles.buttonText}
            >
              ตกลง
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  dialogContainer: {
    borderRadius: 16,
    backgroundColor: "white",
    paddingBottom: 16,
    elevation: 5,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: 'NotoSansThai-Regular',
  },
  dialogContent: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontFamily: 'NotoSansThai-Regular',
    marginVertical: 10,
  },
  dialogActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#249781",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'NotoSansThai-Regular',
  },
});
