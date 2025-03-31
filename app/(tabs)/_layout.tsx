import { Stack, useLocalSearchParams, useRouter, useGlobalSearchParams } from "expo-router";
import { Alert, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from "@apollo/client";
import getEvent from "@/graphql/queries/getEventOne";
import { useMemo } from "react";
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';

// Header component
const CustomHeader = () => {
  const params = useLocalSearchParams();
  const globalParams = useGlobalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const rawEventId = params.id || globalParams.id;
  const eventId = Array.isArray(rawEventId) ? rawEventId[0] : rawEventId;
  const { loading, error, data } = useQuery(getEvent, {
    variables: { _id: eventId },
    skip: !eventId,
  });

  const title = useMemo(() => {
    if (loading) return "กำลังโหลด...";
    if (error) return "เกิดข้อผิดพลาด";
    return data?.eventOne?.name || "ข้อมูลสนาม";
  }, [loading, error, data]);

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: '#249781' }}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <Image
            source={require('@/assets/images/parkrunlogo.png')}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default function Layout() {
  return (
    <Stack
      screenOptions={({ route }) => ({
        headerShown: !['index', 'login', 'scanner', 'resetpassword', 'forgotpassword'].includes(route.name),
        header: () => <CustomHeader />,
        contentStyle: { backgroundColor: '#fff' }
      })}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#249781',
    paddingBottom: 10,
    height: 100,
    justifyContent: 'flex-end',
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
