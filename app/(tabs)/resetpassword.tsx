import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useLazyQuery } from '@apollo/client';
import getUserByEmail from '@/graphql/queries/getUserByEmail';
import Svg, { Path } from 'react-native-svg';

const ChevronLeft = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M15 18L9 12L15 6" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [fetchUser, { loading }] = useLazyQuery(getUserByEmail);

  const handleFindUser = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
  
    try {
      const { data } = await fetchUser({ variables: { email } });
      console.log('GraphQL response:', data); // เช็กข้อมูลที่ response กลับมา
  
      if (data?.userOne?._id) {
        router.push({ pathname: '/forgotpassword', params: { _id: data.userOne._id } });
      } else {
        Alert.alert('Not Found', 'User not found with provided email.');
      }
    } catch (error) {
      console.error('GraphQL error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft />
        </TouchableOpacity>

        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Don't worry! Enter your email address linked with your account.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleFindUser} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Create new password'}</Text>
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
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  statusBarTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  statusBarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 6,
    height: 15,
    gap: 1,
  },
  signalBar: {
    width: 3,
    backgroundColor: '#000',
    borderRadius: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e8ecf4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    marginTop: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1e232c',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#8391a1',
    marginBottom: 24,
    lineHeight: 22,
  },
  input: {
    height: 56,
    backgroundColor: '#f7f8f9',
    borderWidth: 1,
    borderColor: '#e8ecf4',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    height: 56,
    backgroundColor: '#249781',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});