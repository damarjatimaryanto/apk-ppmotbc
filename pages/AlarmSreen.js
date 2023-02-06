import {
  StyleSheet,
  // Modal,
  ActivityIndicator,
  Pressable,
  PermissionsAndroid,
  Text,
  Image,
  View,
  Animated,
  Alert,
  TextInput,
  TouchableOpacity,
  Button,
  StatusBar,
  AppRegistry,
  Dimensions,
  BackHandler,
  Linking,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import moment, { min } from "moment";
import Modal from "react-native-modal";
import * as Notifications from "expo-notifications";

const countries = ["Fase Intensif (Ke 1)", "Fase Lanjutan ( Ke 2)"];
const kategori = ["Pasien Baru", "Pasien Lama"];

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const COLORS = { primary: "#1E319D", white: "#FFFFFF", abu1: "#F6F6F6" };
const blue = "#0D4AA7";
const black = "#3d3d3d";
const red = "#C74B4C";
const grey = "#5C5F68";
const AlarmScreen = () => {
  const navigation = useNavigation();

  const [modal, setModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [userData, setUserData] = useState([
    {
      fase: "",
      kategori: "",
      id_kat: "",
      id_fase: "",
    },
  ]);
  const [hari, setHari] = useState('1');
  const [jam, setJam] = useState("00:00");
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    const time = moment(date).format("HH:mm");
    const hrs = moment(date).format("HH");
    const min = moment(date).format("mm");
    setJam(time);
    setHours(hrs);
    setMinutes(min);

    hideDatePicker();
  };

  const getAlarm = async () => {
    const uid = await AsyncStorage.getItem("uid");

    fetch("https://afanalfiandi.com/ppmo/api/api.php?op=getAlarm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uid,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        setLoading(true);
        setTimeout(async () => {
          const fase = await AsyncStorage.getItem("fase");
          const kategori = await AsyncStorage.getItem("kategori");
          const id_kat = await AsyncStorage.getItem("id_kat");
          const id_fase = await AsyncStorage.getItem("id_fase");

          const userSession = [];
          userSession.push({
            fase: fase,
            kategori: kategori,
            id_kat: id_kat,
            id_fase: id_fase,
          });

          setUserData(userSession);
          if (resp != 0) {
            const id_alarm = resp.id_alarm;
            const id_user = resp.id_user;
            const jam = resp.jam;
            const hari = resp.hari;

            const result = [];
            result.push({
              id_alarm: id_alarm,
              id_user: id_user,
              jam: jam,
              hari: hari,
            });

            setData(result);
            setLoading(false);
          } else {
            setData(null);
            setLoading(false);
          }
        }, 2000);
      });
  };
  const onSubmit = async () => {
    const id_user = await AsyncStorage.getItem("uid");
    const hrs = parseFloat(hours);
    const min = parseFloat(minutes);

    fetch("https://afanalfiandi.com/ppmo/api/api.php?op=insAlarm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id_user,
        hari: hari,
        jam: jam,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        setLoading(true);
        setTimeout(async () => {
          if (resp == 1) {
            Alert.alert("", "Alarm berhasil ditambahkan");
            setLoading(false);
            getAlarm();
            schedulePushNotification(hrs, min);
            setModalVisible(false);
          } else {
            Alert.alert("", "Alarm gagal ditambahkan");
            setLoading(false);
            setModalVisible(false);
          }
        }, 2000);
      });
  };

  
  // notif
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  async function schedulePushNotification(h, m) {
    await Notifications.setNotificationChannelAsync("Minum Obat", {
      name: "Notifikasi Pengingat Minum Obat",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "sound.wav", // Provide ONLY the base filename
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Minum obat woi ngentot",
        body: "Daftar obat : zolam merlo zipras eximer",
        data: { path: "Konfirmasi" },
        shouldPlaySound: true,
        sound: "default",
      },
      trigger: {
        hour: h,
        minute: m,
        repeats: true,
        channelId: "ppmo-tbc-",
      },
    });
  }

  const notificationListener = useRef();
  const responseListener = useRef();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  useEffect(() => {
    getAlarm();
    if (lastNotificationResponse) {

      const route = JSON.stringify(
        lastNotificationResponse.notification.request.content.data.path
      );

      navigation.navigate("Konfirmasi");
    }
  }, [lastNotificationResponse]);

  return (
    <View style={[styles.container, { padding: 15 }]}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={COLORS.primary}
      ></StatusBar>
      <Modal
        animationType="fade"
        transparent={true}
        visible={loading}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModal(false);
        }}
      >
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </Modal>

      {/* Modal Kategori Pasien */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationOutTiming={1000}
        animationInTiming={1000}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 140,
                  height: 140,
                  tintColor: COLORS.primary,
                  backgroundColor: "white",
                  borderRadius: 90,
                  borderWidth: 2,
                  borderColor: COLORS.white,
                  position: "absolute",
                  zIndex: 1,
                  bottom: 1,
                  padding: 4,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    width: "95%",
                    height: "95%",
                    tintColor: COLORS.primary,
                  }}
                  source={require("./../assets/icon/jam.png")}
                />
              </View>

              {/* <Image
                style={{
                  width: 100,
                  height: 100,
                  tintColor: COLORS.primary,
                  backgroundColor: "white",
                  borderRadius: 60,
                  borderWidth: 2,
                  borderColor: COLORS.white,
                  position: "absolute",
                  zIndex: 1,
                  bottom: 9,
                  padding: 4,
                }}
                source={require("./../assets/icon/jam.png")}
              /> */}
            </View>

            <Text style={{ fontFamily: "Poppins-Medium", fontSize: 16 }}>
              {" "}
              Atur waktu alarm anda sendiri.
            </Text>

            <View style={styles.inputhorizontal}>
              <Text
                style={{
                  color: "black",
                  fontFamily: "Poppins-Medium",
                  fontSize: 16,
                }}
              >
                Jam :
              </Text>
              <TouchableOpacity
                onPress={showDatePicker}
                style={[styles.input_horizontal, { alignItems: "center" }]}
              >
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Poppins-Medium",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  {jam}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputhorizontal}>
              <Text
                style={{
                  color: "black",
                  fontFamily: "Poppins-Medium",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Hari Ke- :
              </Text>
              <TextInput
                textAlign="center"
                style={[
                  styles.input_horizontal,
                  {
                    opacity: userData[0].id_kat == 1 ? 0.6 : 1,
                    fontFamily: "Poppins-Medium",
                  },
                ]}
                placeholderTextColor={grey}
                keyboardType="number-pad"
                placeholder="0"
                onChangeText={setHari}
                value={userData[0].id_kat == 1 ? "1" : hari}
                editable={userData[0].id_kat == 1 ? false : true}
              />
            </View>
            <View
              style={[
                styles.inputhorizontal,
                { justifyContent: "space-between" },
              ]}
            >
              <TouchableOpacity
                style={[styles.btn, styles.btn2]}
                onPress={toggleModal}
              >
                <Text
                  style={{ color: COLORS.white, fontFamily: "Poppins-Regular" }}
                >
                  Batal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, styles.btn1]}
                onPress={() => {
                  onSubmit();
                }}
              >
                <Text
                  style={[
                    { color: COLORS.white, fontFamily: "Poppins-Regular" },
                  ]}
                >
                  Simpan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <DateTimePickerModal
        date={selectedDate}
        isVisible={datePickerVisible}
        mode="time"
        is24Hour
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {/* jika loading selesai dan tidak ada data alarm */}

      {loading != true && data == null && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "50%",
            // width: "90%",
            // paddingHorizontal: 10,
          }}
        >
          <Image
            style={{ width: 200, height: 157 }}
            source={require("../assets/icon/illus_alarm.png")}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 200,
              width: "90%",
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 18,
                fontFamily: "Poppins-Medium",
              }}
            >
              Melihat progress anda dengan mudah
            </Text>
            <Text
              style={{
                color: "grey",
                fontSize: 14,
                textAlign: "center",
                fontFamily: "Poppins-LightItalic",
              }}
            >
              Track record harian anda dalam kepatuhan meminum obat akan muncul
              disini.
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.floatingbutton, { marginTop: 20 }]}
            onPress={toggleModal}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.white,
                  margin: 10,
                  fontFamily: "Poppins-Regular",
                }}
              >
                Tambah Alarm
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* jika loading selesai dan  ada data alarm */}
      {loading != true && data != null && (
        <TouchableOpacity
          onPress={() => navigation.navigate("Konfirmasi")}
          style={styles.box}
        >
          <View style={styles.jam}>
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 30,
                color: "white",
              }}
            >
              {data[0].jam}
            </Text>
          </View>
          <View style={styles.keterangan}>
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 20,
                color: "white",
              }}
            >
              {userData[0].kategori}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 16,
                color: "white",
              }}
            >
              {userData[0].fase}
            </Text>
          </View>
          <View style={styles.gmbar_container}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../assets/icon/bell_check.png")}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AlarmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.abu1,
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#25376A",
    paddingVertical: 10,
    width: 150,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  textbtn: {
    fontSize: 16,
    color: "white",
  },
  floatingbutton: {
    alignItems: "center",
    justifyContent: "center",
    // position: 'absolute',
    // bottom: 90,
    // right: 20,
    width: 300,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  box: {
    backgroundColor: COLORS.primary,
    height: 100,
    width: "95%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "5%",
    marginTop: 15,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.4,

    elevation: 10,
  },
  jam: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'yellow',
  },
  keterangan: {
    // backgroundColor: 'grey',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gmbar_container: {
    // backgroundColor: 'red',
    justifyContent: "center",
    alignItems: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    paddingTop: 85,
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    marginVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  inputContainer: {
    marginVertical: 20,
  },
  inputhorizontal: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 10,
    // backgroundColor: "yellow",
  },

  btn_Container: {
    marginVertical: 15,
  },

  input_horizontal: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    paddingVertical: width * 0.013,
    paddingHorizontal: width * 0.04,
    width: "47%",
    height: 45,
    borderRadius: 5,
    color: "grey",
    backgroundColor: "white",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    justifyContent: "center",
    alignItems: "center",
  },

  input_horizontal_2: {
    // borderWidth: 2,
    // borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    paddingVertical: width * 0.013,
    paddingHorizontal: width * 0.04,
    width: "82%",
    height: 45,
    borderRadius: 5,

    fontSize: 16,
    fontFamily: "Poppins-Regular",
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  btn: {
    width: "48%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btn1: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  btn2: {
    backgroundColor: "grey",
    borderRadius: 5,
  },
});
