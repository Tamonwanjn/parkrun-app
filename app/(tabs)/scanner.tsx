import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Button, Dialog } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLazyQuery } from "@apollo/client";
import userById from "@/graphql/queries/getUserOne";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useLocalSearchParams } from "expo-router";

interface RunnerRecord {
  runnerId: string;
  time: string;
  isUploaded: boolean;
  name: string;
  bib: string;
}

export default function Scanner() {
  const { id } = useLocalSearchParams();
  const qrLock = useRef(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [runnerList, setRunnerList] = useState<RunnerRecord[]>([]);
  const router = useRouter();
  const [getUser] = useLazyQuery(userById);
  const [qrImageUri, setQrImageUri] = useState<string | null>(null);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showCustomAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    loadRunnerList();
  }, [id]);

  useEffect(() => {
    saveRunnerList();
  }, [runnerList]);

  const loadRunnerList = async () => {
    try {
      const savedList = await AsyncStorage.getItem(`runnerList_${id}`);
      if (savedList) {
        setRunnerList(JSON.parse(savedList));
      }
    } catch (error) {
      console.error("Failed to load runner list", error);
    }
  };

  const saveRunnerList = async () => {
    try {
      await AsyncStorage.setItem(`runnerList_${id}`, JSON.stringify(runnerList)); 
    } catch (error) {
      console.error("Failed to save runner list", error);
    }
  };

  const addRunner = (data: string, name?: string, bib?: string) => {
    const now = new Date().toISOString();
    const newRunner: RunnerRecord = {
      runnerId: data,
      time: now,
      isUploaded: false,
      name: name || `ผู้ใช้ ${data.slice(-4)}`,
      bib: bib || data.slice(-4),
    };

    setRunnerList((prevList) => {
      const newList = [newRunner, ...prevList];
      AsyncStorage.setItem(`runnerList_${id}`, JSON.stringify(newList))
        .catch(error => console.error("Failed to save runner list", error));
      return newList;
    });
  };


  const processQRScan = async (data: string) => {
    if (data.length !== 24) {
      showCustomAlert("QR ไม่ถูกต้อง", "ข้อมูล QR ไม่ถูกต้อง");
      qrLock.current = false;
      return;
    }

    try {
      const { data: result } = await getUser({ variables: { _id: data } });
      const user = result?.userOne;

      if (user) {
        addRunner(data, user.name, user.bib);
        showCustomAlert("สแกนสำเร็จ", `พบข้อมูลผู้ใช้: ${user.name}`);
      } else {
        addRunner(data);
        showCustomAlert("สแกนไม่สำเร็จ", "ไม่พบข้อมูลผู้ใช้");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      addRunner(data);
      showCustomAlert("ข้อผิดพลาด", "เกิดข้อผิดพลาดขณะตรวจสอบข้อมูลผู้ใช้");
    }

    setTimeout(() => {
      qrLock.current = false;
    }, 2000);
  };


  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("สิทธิ์ถูกปฏิเสธ", "กรุณาอนุญาตให้แอปเข้าถึงคลังภาพ");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setQrImageUri(result.assets[0].uri);
      try {
        const scannedCodes = await BarCodeScanner.scanFromURLAsync(result.assets[0].uri);
        if (scannedCodes && scannedCodes.length > 0) {
          processQRScan(scannedCodes[0].data);
        } else {
          Alert.alert('ไม่พบ QR Code', 'ไม่พบ QR Code ในรูปภาพที่เลือก');
        }
      } catch (error) {
        console.error('Error scanning QR code:', error);
        Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถอ่าน QR Code จากรูปภาพได้');
      }
    }
  };

  if (hasPermission === null) return <Text style={{ fontFamily: 'NotoSansThai-Regular' }}>กำลังขอสิทธิ์กล้อง...</Text>;
  if (hasPermission === false) return <Text style={{ fontFamily: 'NotoSansThai-Regular' }}>ไม่มีสิทธิ์ใช้งานกล้อง</Text>;

  const truncateId = (id: string) => {
    return id.length > 8 ? `....${id.substring(id.length - 8)}` : id;
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              processQRScan(data);
            }
          }}
        />

        <View style={styles.scanFrame}>
          <View style={styles.scanLine} />
        </View>

        <View style={[styles.cameraControls, { justifyContent: 'center' }]}>

          //เลือกรูป QR จากคลังภาพ
          {/* <TouchableOpacity style={styles.scanActionButton} onPress={pickImage}>
            <Ionicons name="images-outline" size={24} color="#fff" />
            <Text style={[styles.scanActionText, { fontFamily: 'NotoSansThai-Regular' }]}>เลือกรูป QR</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={[styles.doneButton, { alignSelf: 'center' }]}
            onPress={() => router.back()}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="stop-circle-outline" size={24} color="#D32F2F" />
              <Text style={[styles.doneButtonText, { fontFamily: 'NotoSansThai-Regular' }]}>Stop Scan</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.listContainer}>
        <Text style={[styles.listTitle, { fontFamily: 'NotoSansThai-Regular' }]}>รายการบันทึก</Text>
        {runnerList.length > 0 ? (
          <FlatList
            data={runnerList}
            keyExtractor={(item, index) => `${item.runnerId}-${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.listItem}>
                <Text style={[styles.listItemNumber, { fontFamily: 'NotoSansThai-Regular' }]}>{index + 1}</Text>
                <Text style={[styles.listItemId, { fontFamily: 'NotoSansThai-Regular' }]}>{truncateId(item.runnerId)}</Text>
                <View style={styles.listItemRightContent}>
                  <Text style={[styles.listItemTime, { fontFamily: 'NotoSansThai-Regular' }]}>{formatTime(item.time)}</Text>
                  <Ionicons
                    name={item.isUploaded ? "cloud-done-outline" : "cloud-upload-outline"}
                    size={20}
                    color={item.isUploaded ? "#88ccc4" : "#249781"}
                  />
                </View>
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyList}>
            <Text style={[styles.emptyListText, { fontFamily: 'NotoSansThai-Regular' }]}>ยังไม่มีข้อมูล</Text>
          </View>
        )}
      </View>
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

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
  },
  cameraContainer: {
    flex: 3,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  scanFrame: {
    position: "absolute",
    top: "40%",
    left: "10%",
    width: "80%",
    height: 350,
    borderColor: "#4DAEB6",
    borderWidth: 3,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: -118 }],
  },
  scanLine: {
    width: "90%",
    height: 2,
    backgroundColor: "#4DAEB6",
    position: "absolute",
  },
  cameraControls: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flashButton: {
    height: 40,
    width: 150,
    borderColor: 'white',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButton: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    bottom: 16,
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
    fontFamily: 'NotoSansThai-Regular',
  },
  listContainer: {
    flex: 2,
    padding: 10,
    backgroundColor: '#249781'
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    fontFamily: 'NotoSansThai-Regular',
  },
  listItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    fontFamily: 'NotoSansThai-Regular',
  },
  listItemNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 16,
    fontFamily: 'NotoSansThai-Regular',
  },
  listItemId: {
    fontSize: 18,
    width: 140,
  },
  listItemRightContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  listItemTime: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 4,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    color: 'white',
    fontSize: 24,
  },

  scanActionButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  scanActionText: {
    color: "#FFFFFF",
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'NotoSansThai-Regular'
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