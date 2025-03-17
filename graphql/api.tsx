import axios from 'axios';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.APP_API_URL || 'https://asia-southeast2-parkrun-th-staging.cloudfunctions.net/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ เพิ่มฟังก์ชันดึงข้อมูล Events
export const fetchEvents = async () => {
  try {
    const response = await api.get('/events'); // ตรวจสอบให้แน่ใจว่า endpoint ถูกต้อง
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default api;
