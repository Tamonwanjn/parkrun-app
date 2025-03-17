import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Provider as PaperProvider, Card, Portal, Dialog, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';
import getAllEvent from '../../graphql/queries/getAllEvent';
import getEvent from '../../graphql/queries/getEventOne';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Event {
  _id: string;
  name: string;
  date: string;
  location: string;
  image: string;
  address?: string;
  status: "อนุมัติ" | "รอดำเนินการ" | "ปฏิเสธ";
}

const statusConfig = {
  อนุมัติ: { color: "#16A34A", backgroundColor: "#DCFCE7" },
  รอดำเนินการ: { color: "#D97706", backgroundColor: "#FEEFC3" },
  ปฏิเสธ: { color: "#DC2626", backgroundColor: "#FFDAD9" },
};

const EventCard = ({ event, onPress }: { event: Event; onPress: () => void }) => {
  const { loading, error, data } = useQuery(getEvent, { variables: { _id: event._id } });

  const eventImage = event.image && event.image.trim() !== "" ? event.image : null;
  const eventLocation = data?.eventOne?.location || event.location;

  const rawLevels = data?.eventOne?.levels || "unknown";
  const eventLevels =
    rawLevels === "every"
      ? "จัดทุกสัปดาห์"
      : rawLevels === "twice"
        ? "จัดเดือนละ 2 ครั้ง (จัดวันเสาร์แรกและเสาร์สามของเดือน)"
        : rawLevels === "once"
          ? "จัดเดือนละ 1 ครั้ง (จัดวันเสาร์แรก)"
          : "ไม่ระบุ";

  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(`/event?id=${event._id}`)}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Image
            source={eventImage ? { uri: eventImage } : require('@/assets/images/parkrun.png')}
            style={styles.eventImage}
          />
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{event.name}</Text>
            <Text style={styles.eventLocation}>
              <Ionicons name="location-outline" size={16} color="#4DAEB6" /> {eventLocation}
            </Text>

            <View style={styles.statusContainer}>
              {loading ? (
                <ActivityIndicator size="small" color="#4DAEB6" />
              ) : error ? (
                <Text style={{ color: "red", fontSize: 12 }}>Error loading levels</Text>
              ) : (
                <View style={styles.levelContainer}>
                  <Ionicons name="calendar-outline" size={16} color="#4DAEB6" style={styles.calendarIcon} />
                  <Text style={[styles.statusText, { color: "#333" }]}>{eventLevels}</Text>
                </View>
              )}
            </View>
          </View>
          <Text style={styles.eventDate}>{event.date}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const router = useRouter();
  const { loading, error, data } = useQuery(getAllEvent);

  const handleLogout = async () => {
    setLogoutDialogVisible(false); // ปิด Dialog ก่อน
    await AsyncStorage.removeItem("userToken"); // 🔥 ลบ Token ออกจาก Storage
  
    setTimeout(() => {
      router.replace("/login"); // ✅ เปลี่ยนหน้าไป login
    }, 500); // หน่วงเวลาสั้น ๆ เพื่อให้ UI อัปเดต
  };
  

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#249781" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Error loading events: {error.message}</Text>
      </View>
    );
  }

  const filteredEvents = data?.eventMany.filter((event: Event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const events = data?.eventMany || [];

  
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#249781" barStyle="light-content" />
        <View style={styles.topContainer}>
          <View style={styles.topRow}>
            <Image
              source={require('@/assets/images/parkrunlogo.png')}
              style={styles.logo}
            />

            <View style={styles.textContainer}>
              <TouchableOpacity 
                onPress={() => setLogoutDialogVisible(true)} 
                style={styles.logoutButton}
              >
                <Ionicons name="log-out-outline" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.topTitle}>อาสาสมัครทั้งหมด</Text>
              <Text style={styles.topSubtitle}>{events.length} สนาม</Text>
            </View>
          </View>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#4DAEB6" style={styles.searchIcon} />
            <TextInput
              placeholder="ค้นหาชื่อสนาม"
              placeholderTextColor="#4DAEB6"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={[styles.searchInput, { fontFamily: 'NotoSansThai-Regular' }]}
              autoCorrect={false}
              allowFontScaling={false}
              keyboardType="default"
            />

            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#4DAEB6" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.sectionTitle}>รายการสนามที่คุณเป็นอาสาสมัคร</Text>

        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <EventCard event={item} onPress={() => router.push({ pathname: "/event", params: { id: item._id } })} />
          )}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={<View style={{ height: 20 }} />}
        />

        {/* Logout confirmation dialog */}
        <Portal>
          <Dialog
            visible={logoutDialogVisible}
            onDismiss={() => setLogoutDialogVisible(false)}
            style={styles.dialogContainer}
          >
            <Dialog.Title style={styles.dialogTitle}>ออกจากระบบ</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.dialogContent}>
                คุณต้องการออกจากระบบหรือไม่?
              </Text>
            </Dialog.Content>
            <Dialog.Actions style={styles.dialogActions}>
              <Button 
                mode="contained" 
                onPress={() => setLogoutDialogVisible(false)} 
                style={styles.cancelButton}
                labelStyle={styles.buttonText}
              >
                ยกเลิก
              </Button>
              <Button 
                mode="contained" 
                onPress={handleLogout} 
                style={styles.confirmButton}
                labelStyle={styles.buttonText}
              >
                ตกลง
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  topContainer: {
    backgroundColor: "#249781",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 24 : 0,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    marginLeft: -45,
    width: 250,
    height: 70,
    resizeMode: 'contain',
  },
  topTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    fontFamily: 'NotoSansThai-Bold',
  },
  topSubtitle: {
    color: "#fff",
    fontSize: 24,
    marginTop: 4,
    fontFamily: 'NotoSansThai-Regular',
  },
  textContainer: {
    alignItems: "flex-end",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
    fontFamily: 'NotoSansThai-Bold',
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 48,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#4DAEB6',
    padding: 0,
    fontFamily: 'NotoSansThai-Regular',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  eventInfo: {
    flex: 1,
    marginLeft: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: 'NotoSansThai-Bold',
  },
  eventLocation: {
    fontSize: 14,
    marginTop: 6,
    color: "#666",
    fontFamily: 'NotoSansThai-Regular',
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: 'NotoSansThai-Regular',
  },
  eventDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginLeft: 8,
    fontFamily: 'NotoSansThai-Regular',
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
    fontFamily: 'NotoSansThai-Bold',
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
  positionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    marginBottom: 8,
  },
  selectedItem: {
    backgroundColor: "#E8F5E9",
  },
  positionText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
    fontFamily: 'NotoSansThai-Regular',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#EB4343",
    borderRadius: 8,
    marginRight: 8,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#249781",
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'NotoSansThai-Bold',
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendarIcon: {
    marginRight: 4,
  },
  logoutButton: {
    position: 'absolute',
    right: 0,
    top: -30, 
  },
});