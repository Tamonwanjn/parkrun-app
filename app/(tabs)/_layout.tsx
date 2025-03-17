import { Stack, useLocalSearchParams, useRouter, useGlobalSearchParams } from "expo-router";
import { Alert, View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from "@apollo/client";
import getEvent from "@/graphql/queries/getEventOne";
import { useMemo } from "react";

// Header component
const CustomHeader = () => {
  const params = useLocalSearchParams();
  const globalParams = useGlobalSearchParams();
  const router = useRouter();

  // 🔹 ดึง _id จาก params
  const eventId = params.id || globalParams.id;

  // 🔹 ใช้ useQuery เพื่อดึงข้อมูล event ตาม _id
  const { loading, error, data } = useQuery(getEvent, {
    variables: { _id: eventId },
    skip: !eventId, // ถ้าไม่มี _id ไม่ต้อง query
  });

  // 🔹 ใช้ useMemo เพื่อดึง title จาก eventOne
  const title = useMemo(() => {
    if (loading) return "กำลังโหลด...";
    if (error) return "เกิดข้อผิดพลาด";
    return data?.eventOne?.name || "ข้อมูลสนาม";
  }, [loading, error, data]);

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.headerText}>ข้อมูลสนาม</Text>
        </TouchableOpacity>

        <Image
          source={require('@/assets/images/parkrunlogo.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default function Layout() {
  return (
    <Stack
      screenOptions={({ route }) => ({
        headerShown: !['index', 'login', 'resetpassword', 'forgotpassword'].includes(route.name),
        header: () => <CustomHeader />,
        contentStyle: { backgroundColor: '#fff' }
      })}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#249781',
    paddingTop: 60,
    paddingBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    position: 'relative',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  headerText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
  logo: {
    width: 150,
    height: 45,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  profileButton: {
    padding: 4,
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'NotoSansThai-Bold',
  },
});
