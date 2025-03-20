import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Platform, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Button, Surface, Portal, Dialog } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Camera, CameraView } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useQuery } from "@apollo/client";
import getEvent from "@/graphql/queries/getEventOne";
import races from "@/graphql/queries/races";
import getRunnersByEvent from "@/graphql/queries/getRunnersByEvent";

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

function QrScanner({ setIsScanning }: { setIsScanning: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [qrImageUri, setQrImageUri] = useState<string | null>(null);
  const [torchOn, setTorchOn] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("สิทธิ์ถูกปฏิเสธ", "กรุณาอนุญาตให้แอปเข้าถึงคลังภาพ");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Fixed: Use the proper enum
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setQrImageUri(result.assets[0].uri);
      // ทำการประมวลผล QR code จากรูปภาพที่เลือก
      Alert.alert(
        "สแกนสำเร็จ",
        "บันทึกการเข้างานเรียบร้อยแล้ว",
        [
          {
            text: "ตกลง",
            onPress: () => {
              setIsScanning(false);
            }
          }
        ]
      );
    }
  };

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;
    setScanned(true);
    Alert.alert(
      "สแกนสำเร็จ",
      "บันทึกการเข้างานเรียบร้อยแล้ว",
      [
        {
          text: "ตกลง",
          onPress: () => {
            setIsScanning(false);
          }
        }
      ]
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>ไม่สามารถใช้กล้องได้ กรุณาให้สิทธิ์</Text>
        <Button
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
          }}
        >
          Allow Camera
        </Button>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        onBarcodeScanned={handleBarCodeScanned}
        enableTorch={torchOn}
      />

      {/* กรอบสแกน */}
      <View style={styles.scanFrame}>
        <View style={styles.scanLine} />
      </View>

      {/* ปุ่ม STOP SCAN แทนกากบาท */}
      <TouchableOpacity style={styles.stopScanButton} onPress={() => setIsScanning(false)}>
        <Ionicons name="stop-circle" size={24} color="#fff" />
        <Text style={styles.stopScanText}>Stop Scan</Text>
      </TouchableOpacity>

      {/* ปุ่มด้านล่าง */}
      <View style={styles.bottomScanButtons}>
        <TouchableOpacity style={styles.scanActionButton} onPress={() => setTorchOn(!torchOn)}>
          <Ionicons name={torchOn ? "flash" : "flash-outline"} size={24} color="#fff" />
          <Text style={styles.scanActionText}>เปิดไฟฉาย</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.scanActionButton} onPress={pickImage}>
          <Ionicons name="images-outline" size={24} color="#fff" />
          <Text style={styles.scanActionText}>เลือกรูป QR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Main Event Component
export default function Event() {
  const { id, position, date } = useLocalSearchParams();
  const eventDate = Array.isArray(date) ? date[0] : date;

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

  // Loading and error states
  if (loading || raceLoading) return <Text style={styles.loadingText}>กำลังโหลด...</Text>;
  if (error || raceError) return <Text style={styles.errorText}>เกิดข้อผิดพลาด</Text>;

  // Show QR scanner if scanning is active
  if (isScanning) {
    return <QrScanner setIsScanning={setIsScanning} />;
  }

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

  const renderRunnerCard = (runner) => (
    <Surface key={runner._id} style={styles.runnerCard}>
      <Text style={styles.runnerText}>
        <Text style={styles.runnerNumber}>#{runner.user.bib}</Text> {runner.user.name}
      </Text>
      <Text style={styles.timeText}>{runner.time || "ยังไม่มีเวลา"}</Text>
    </Surface>
  );

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
              <Text style={styles.infoValue}>{startTime}</Text>
            </View>
          </View>
        </Surface>

        <Surface style={styles.infoBox}>
          <Text style={styles.infoLabel}>รายชื่อนักวิ่งที่เข้าร่วม</Text>
          {runnerLoading ? (
            <Text style={styles.loadingText}>กำลังโหลดข้อมูลนักวิ่ง...</Text>
          ) : runners.length > 0 ? (
            runners.map(renderRunnerCard)
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

        {/* ปุ่มสแกน QR code */}
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
          onPress={() => setIsScanning(true)}
        >
          <Animated.View style={[styles.scanButton, { transform: [{ scale: scaleAnim }] }]}>
            <Ionicons name="qr-code" size={24} color={THEME_COLORS.white} />
            <Text style={styles.buttonText}>สแกน</Text>
          </Animated.View>
        </TouchableOpacity>
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
  },
  loadingText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    padding: 20,
    color: 'red',
    fontSize: 16,
  },
  infoBox: {
    backgroundColor: THEME_COLORS.secondary,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 1,
  },
  infoRowWithBadge: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
  },
  infoValue: {
    color: THEME_COLORS.text,
    fontSize: 16,
    fontWeight: "600",
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
  },
  runnersList: {
    paddingHorizontal: 16,
  },
  runnerCard: {
    backgroundColor: THEME_COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
  },
  runnerText: {
    fontSize: 16,
    color: THEME_COLORS.text,
  },
  runnerNumber: {
    fontWeight: "600",
  },
  timeText: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME_COLORS.primary,
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
    gap: 16,  // Increased gap between elements
    elevation: 8,
    justifyContent: "space-between", // Ensure proper spacing between elements
    alignItems: "center", // Center items vertically
  },
  dropdownContainer: {
    flex: 1,
    marginRight: 8, // Add margin to ensure separation
  },
  dropdownButton: {
    borderColor: THEME_COLORS.primary,
    borderWidth: 1,
    maxWidth: "100%", // Ensure button doesn't overflow
  },
  dropdownButtonContent: {
    height: 48,
  },
  scanButton: {
    backgroundColor: THEME_COLORS.primary,
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
  },
  closeScannerBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  scanFrame: {
    position: "absolute",
    top: "40%",
    left: "10%",
    width: "80%",
    height: 300,
    borderColor: "#4DAEB6",
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    transform: [{ translateY: -150 }],
  },
  scanLine: {
    width: "90%",
    height: 2,
    backgroundColor: "#4DAEB6",
    position: "absolute",
  },
  stopScanButton: {
    position: "absolute",
    bottom: 120,
    alignSelf: "center",
    backgroundColor: "#D32F2F",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    elevation: 2,
  },
  stopScanText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  zoomButtons: {
    position: "absolute",
    bottom: 120,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 5,
  },
  zoomButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  zoomButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  bottomScanButtons: {
    position: "absolute",
    bottom: 60, 
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    marginHorizontal: 10, 
  },
  scanActionButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  scanActionText: {
    color: "#FFFFFF",
    marginTop: 5,
    fontSize: 14,
  }
});