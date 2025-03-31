import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Platform, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Surface, Portal, Dialog } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Camera, CameraView } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useQuery } from "@apollo/client";
import getEvent from "@/graphql/queries/getEventOne";
import races from "@/graphql/queries/races";
import getRunnersByEvent from "@/graphql/queries/getRunnersByEvent";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

interface Runner {
  _id: string;
  user: {
    bib: number;
    name: string;
  };
  time?: string;
}

const THEME_COLORS = {
  primary: "#00A572",
  secondary: "#E8F5F3",
  success: "#22C55E",
  text: "#1A1A1A",
  textSecondary: "#666666",
  white: "#FFFFFF",
};

// Main Event Component
export default function Event() {
  const { id, position, date } = useLocalSearchParams();
  const eventDate = Array.isArray(date) ? date[0] : date;
  const [scannedRunners, setScannedRunners] = useState<Runner[]>([]);
  const router = useRouter();

  // GraphQL query
  const { loading, error, data } = useQuery(getEvent, {
    variables: { _id: id },
    skip: !id, // Skip if no id is provided
  });

  const { loading: raceLoading, error: raceError, data: raceData } = useQuery(races, {
    variables: { _id: id },
    skip: !id,
  });

  const { loading: runnerLoading, error: runnerError, data: runnerData } = useQuery(getRunnersByEvent, {
    variables: { eventId: id },
    skip: !id, // ถ้าไม่มี id ให้ข้ามการ query
  });

  const event = data?.eventOne;
  const startPoint = event?.startPoint || "จุดเริ่มต้นไม่ระบุ";
  const finishPoint = event?.finishPoint || "จุดเส้นชัยไม่ระบุ";

  // Filter out duplicate checkpoint options
  const CHECKPOINT_OPTIONS = [...new Set([startPoint, finishPoint])];

  // Initialize selectedLocation with the position from URL parameters if available
  const initialPosition = typeof position === 'string' ? position : CHECKPOINT_OPTIONS[0];
  const [selectedLocation, setSelectedLocation] = useState(initialPosition);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [isScanning, setIsScanning] = useState(false);
  const race = raceData?.raceMany?.[0];
  const eventName = event?.name || "ข้อมูลสนาม";
  const eventLocation = event?.location || "ไม่ระบุ";
  const eventStatus = event?.status || "ไม่ระบุ";
  const startTime = race?.startTime ? new Date(race.startTime).toLocaleString('th-TH') : "ไม่ระบุ";
  const runners = runnerData?.runners || [];
  const combinedRunners = [...runners, ...scannedRunners];
  const [checkedInCount, setCheckedInCount] = useState(0);

  // Add eventLevels formatting similar to index.tsx
  const rawLevels = event?.levels || "ไม่ระบุ";
  const eventLevels =
    rawLevels === "every"
      ? "จัดทุกสัปดาห์"
      : rawLevels === "twice"
        ? "จัดเดือนละ 2 ครั้ง (จัดวันเสาร์แรกและเสาร์สามของเดือน)"
        : rawLevels === "once"
          ? "จัดเดือนละ 1 ครั้ง (จัดวันเสาร์แรก)"
          : "ไม่ระบุ";

  // Animation functions
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // อันนี้คือ set ให้สแกนหลัง 10 โมงไม่ได้ 
  // const handleScanPress = () => {
  //   if (!race?.startTime) {
  //     Alert.alert("ไม่สามารถสแกนร่วมงานได้", "ไม่พบข้อมูลเวลาเริ่มงาน");
  //     return;
  //   }

  //   const startDate = new Date(race.startTime);
  //   const oneHourBefore = new Date(startDate);
  //   oneHourBefore.setHours(startDate.getHours() - 1); // 1 ชั่วโมงก่อนเวลาเริ่ม

  //   const cutoffTime = new Date(startDate);
  //   cutoffTime.setHours(10, 0, 0); // ตั้งเวลาปิดรับสแกนเป็น 10:00 น.

  //   const now = new Date();

  //   if (now < oneHourBefore) {
  //     Alert.alert(
  //       "ไม่สามารถสแกนได้",
  //       `สามารถสแกนได้ 1 ชั่วโมงก่อนเวลาเริ่มงาน (${oneHourBefore.toLocaleTimeString('th-TH')})`
  //     );
  //     return;
  //   }

  //   if (now > cutoffTime) {
  //     Alert.alert(
  //       "ไม่สามารถสแกนได้",
  //       "ขณะนี้เลยเวลาสแกนเข้าร่วมงานแล้ว (หลัง 10:00 น.)"
  //     );
  //     return;
  //   }

  //   router.push(`/scanner?id=${id}&position=${selectedLocation}&date=${eventDate}`);
  // };

  const renderInfoItem = (icon: string, label: string, value: string | number) => (
    <View style={styles.infoRow}>
      <View style={styles.infoItem}>
        <Ionicons name={icon as any} size={24} color={THEME_COLORS.primary} />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={styles.infoValue}>{String(value)}</Text>
        </View>
      </View>
    </View>
  );

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };
  const renderRunnerCard = (runner: Runner, index: number) => (
    <Surface 
      key={runner._id} 
      style={[
        styles.runnerCard, 
        { backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#80CFC0' }
      ]}
    >
      <Text style={[
        styles.runnerText,
        { color: index % 2 === 0 ? THEME_COLORS.text : '#FFFFFF' }
      ]}>
        <Text style={[
          styles.runnerNumber,
          { color: index % 2 === 0 ? THEME_COLORS.text : '#FFFFFF' }
        ]}>#{combinedRunners.length - index}</Text> {runner.user.name}
      </Text>
      <Text style={[
        styles.timeText,
        { color: index % 2 === 0 ? THEME_COLORS.primary : '#FFFFFF' }
      ]}>
        {runner.time ? formatTime(runner.time) : "ยังไม่มีเวลา"}
      </Text>
    </Surface>
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchScannedRunners = async () => {
        try {
          const stored = await AsyncStorage.getItem(`runnerList_${id}`);
          if (stored) {
            const parsed = JSON.parse(stored);
            const formatted: Runner[] = parsed.map((item: any) => ({
              _id: item.runnerId,
              user: {
                bib: item.bib,
                name: item.name
              },
              time: item.time
            }));
            setScannedRunners(formatted);
            setCheckedInCount(parsed.length); // Update counter
          } else {
            setCheckedInCount(0); // Reset counter if no data
          }
        } catch (error) {
          console.error('ไม่สามารถโหลดข้อมูลจาก AsyncStorage', error);
          setCheckedInCount(0);
        }
      };

      fetchScannedRunners();
    }, [id])
  );

  if (loading || raceLoading) return <Text style={styles.loadingText}>กำลังโหลด...</Text>;
  if (error || raceError) return <Text style={styles.errorText}>เกิดข้อผิดพลาด</Text>;

  return (
    <>
      <StatusBar style="dark" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Surface style={styles.infoBox}>
          <View style={styles.infoRowWithBadge}>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={24} color="#00A572" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>ตำแหน่งปัจจุบัน</Text>
                <Text style={styles.infoValue}>{selectedLocation}</Text>
              </View>
            </View>
            <View style={styles.approvedBadge}>
              <Text style={styles.approvedText}>{eventLevels}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={24} color="#00A572" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>วันที่และเวลาเริ่มงาน</Text>
              <Text style={styles.infoValue}>{startTime} น.</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={24} color="#00A572" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>จำนวนผู้เช็คอิน</Text>
              <Text style={styles.infoValue}>{checkedInCount} คน</Text>
            </View>
          </View>
        </Surface>

        <Surface style={styles.runnerListBox}>
  <Text style={[styles.infoLabel, { fontSize: 18, fontWeight: "bold", marginBottom: 8 }]}>
    รายชื่อนักวิ่งที่เข้าร่วม
  </Text>

  {runnerLoading ? (
    <Text style={styles.loadingText}>กำลังโหลดข้อมูลนักวิ่ง...</Text>
  ) : combinedRunners.length > 0 ? (
    combinedRunners.map(renderRunnerCard)
  ) : (
    <Text style={styles.errorText}>ไม่มีผู้เข้าร่วม</Text>
  )}
</Surface>

      </ScrollView>

      {/* Bottom bar with scan button */}
      <Surface style={styles.bottomBar}>
        <View style={styles.dropdownContainer}>
          <Button
            mode="outlined"
            onPress={() => setDialogVisible(true)}
            style={styles.dropdownButton}
            contentStyle={styles.dropdownButtonContent}
          >
            {selectedLocation || "เลือกตำแหน่ง"}
          </Button>
        </View>

        {/* ปุ่มสแกน QR code แบบธรรมดา*/}
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
          onPress={() => router.push(`/scanner?id=${id}&position=${selectedLocation}&date=${eventDate}`)}
        >
          <Animated.View style={[styles.scanButton, { transform: [{ scale: scaleAnim }] }]}>
            <Ionicons name="qr-code" size={24} color={THEME_COLORS.white} />
            <Text style={styles.buttonText}>สแกน</Text>
          </Animated.View>
        </TouchableOpacity>
        {/* ปุ่มสแกน QR code แบบห้ามสแกนหลัง10โมง*/}
        {/* <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
          onPress={handleScanPress}
        >
          <Animated.View style={[styles.scanButton, { transform: [{ scale: scaleAnim }] }]}>
            <Ionicons name="qr-code" size={24} color={THEME_COLORS.white} />
            <Text style={styles.buttonText}>สแกน</Text>
          </Animated.View>
        </TouchableOpacity> */}
      </Surface>

      {/* Checkpoint selection dialog */}
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
          style={styles.dialogContainer}
        >
          <Dialog.Title style={styles.dialogTitle}>เปลี่ยนตำแหน่งจุดเช็คอิน</Dialog.Title>
          <Dialog.Content>
            {CHECKPOINT_OPTIONS.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.positionItem, selectedLocation === option && styles.selectedItem]}
                onPress={() => setSelectedLocation(option)}
              >
                <Ionicons
                  name={selectedLocation === option ? "radio-button-on" : "radio-button-off"}
                  size={24}
                  color="#249781"
                />
                <Text style={styles.positionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            <Button
              mode="contained"
              onPress={() => setDialogVisible(false)}
              style={styles.cancelButton}
              labelStyle={styles.buttonText}
            >
              ยกเลิก
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                setSelectedLocation(selectedLocation);
                setDialogVisible(false);
              }}
              style={styles.confirmButton}
              labelStyle={styles.buttonText}
            >
              ตกลง
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.white,
  },
  contentContainer: {
    paddingBottom: 100,
    flexGrow: 1, 
  },
  loadingText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    fontFamily: 'NotoSansThai-Regular',
  },
  errorText: {
    textAlign: 'center',
    padding: 20,
    color: 'red',
    fontSize: 16,
    fontFamily: 'NotoSansThai-Regular',
  },
  infoBox: {
    backgroundColor: THEME_COLORS.secondary,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 1,
    marginBottom: 5,
  },
  infoRowWithBadge: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoTextContainer: {
    marginLeft: 12,
  },
  infoLabel: {
    color: THEME_COLORS.textSecondary,
    fontSize: 14,
    fontFamily: 'NotoSansThai-Regular',
  },
  infoValue: {
    color: THEME_COLORS.text,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: 'NotoSansThai-Regular',
  },
  approvedBadge: {
    backgroundColor: `${THEME_COLORS.success}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  approvedText: {
    color: THEME_COLORS.success,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: 'NotoSansThai-Regular',
  },
  runnersList: {
    paddingHorizontal: 16,
  },
  runnerListBox: {
    backgroundColor: THEME_COLORS.secondary,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 1,
    marginBottom: 5,
    flex: 1, 
    minHeight: 300, 
  },
  runnerCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
  },
  runnerText: {
    fontSize: 16,
    color: THEME_COLORS.text,
    fontFamily: 'NotoSansThai-Regular',
  },
  runnerNumber: {
    fontWeight: "600",
    fontFamily: 'NotoSansThai-Regular',
  },
  timeText: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME_COLORS.primary,
    fontFamily: 'NotoSansThai-Regular',
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: THEME_COLORS.white,
    flexDirection: "row",
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 32 : 16,
    gap: 16,
    elevation: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownContainer: {
    flex: 1,
    marginRight: 8,
  },
  dropdownButton: {
    borderColor: THEME_COLORS.primary,
    borderWidth: 1,
    maxWidth: "100%",
  },
  dropdownButtonContent: {
    height: 48,
  },
  scanButton: {
    backgroundColor: '#249781',
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    elevation: 2,
  },
  buttonText: {
    color: THEME_COLORS.white,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: 'NotoSansThai-Regular',
  },
});