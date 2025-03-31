import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useMutation } from '@apollo/client';
import changePasswordMutation from '@/graphql/mutations/changePassword.js';
import Svg, { Path } from 'react-native-svg';

const ChevronLeft = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M15 18L9 12L15 6" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { _id } = useLocalSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePassword, { loading }] = useMutation(changePasswordMutation);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!_id) {
      Alert.alert('Error', 'User ID is missing');
      return;
    }

    try {
      await changePassword({ variables: { _id, password: newPassword } });
      Alert.alert('Success', 'Password changed successfully');
      router.replace('/login');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to change password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft />
        </TouchableOpacity>

        <Text style={styles.heading}>สร้างรหัสผ่านใหม่</Text>
        <Text style={styles.subtitle}>คุณสามารถรีเซ็ตรหัสผ่านได้แล้ว!</Text>

        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <TextInput
          style={[styles.input, { marginTop: 10 }]} 
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={[styles.resetButton, { marginTop: 50 }]}  onPress={handleResetPassword} disabled={loading}>
          <Text style={styles.resetButtonText}>{loading ? 'Resetting...' : 'Reset Password'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e8ecf4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e232c',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#8391a1',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 32,
    gap: 16,
  },
  input: {
    height: 56,
    backgroundColor: '#f7f8f9',
    borderWidth: 1,
    borderColor: '#e8ecf4',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1e232c',
  },
  resetButton: {
    height: 56,
    backgroundColor: '#249781',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
});