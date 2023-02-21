import {
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Text,
  Image,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ScrollView,
  ToastAndroid,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment, { min } from "moment";
import Modal from "react-native-modal";
import * as Notifications from "expo-notifications";
// import getAlarm from "./function/getAlarm";
import addInsentif from "./function/addInsentif";
import addExtend from "./function/addExtend";
import addLanjutan from "./function/addLanjutan";
import { SafeAreaView } from "react-native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const COLORS = { primary: "#1E319D", white: "#FFFFFF", abu1: "#F6F6F6" };
const blue = "#0D4AA7";
const black = "#3d3d3d";
const red = "#C74B4C";
const grey = "#5C5F68";
const blue_icon = "#9695C0";
const AlarmScreen = () => {
  const navigation = useNavigation();
  const dataHari = [
    {
      key: 1,
      hari: "Min",
    },
    {
      key: 2,
      hari: "Sen",
    },
    {
      key: 3,
      hari: "Sel",
    },
    {
      key: 4,
      hari: "Rab",
    },
    {
      key: 5,
      hari: "Kam",
    },
    {
      key: 6,
      hari: "Jum",
    },
    {
      key: 7,
      hari: "Sab",
    },
  ]; // data hari untuk loop pada form
  const selectedDate = new Date(); // tanggal skrg pada datepicker

  // loading
  const [loading, setLoading] = useState(false); // loading activityindicator

  // refresh
  const [refresh, setRefresh] = useState(Math.random()); // refresh bukan refreshcontrol
  const [refreshing, setRefreshing] = useState(false); // refresh refreshcontrol

  // modal
  const [isModalVisible, setModalVisible] = useState(false); // modal tambah data
  const [isFaseKaton, setFaseKaton] = useState(false); // modal fase pada form
  const [datePickerVisible, setDatePickerVisible] = useState(false); // menampilkan jam picker
  const [isModalMetu, setModalMetu] = useState(false);

  // simpan data
  const [dataFase, setDataFase] = useState([]); // menyimpan data fase untuk ditampilkan pada form
  const [data, setData] = useState(null); // menyimpan data alarm

  // data yang dipilih dari form
  const [jam, setJam] = useState("00 : 00"); // menyimpan jam alarm yang dipilih untuk disimpan ke database>alarm>jam
  const [hours, setHours] = useState(); // menyimpan jam untuk dikirim ke notifikasi
  const [minutes, setMinutes] = useState(); // menyimpan menit untuk dikirim ke notifikasi

  const [hariAlarm, setHariAlarm] = useState([]); // menyimpan hari yang dipilih dari form
  const [labelHariSatu, setLabelHariSatu] = useState(null); // menyimpan nama hari ke satu
  const [labelHariDua, setLabelHariDua] = useState(null); // menyimpan nama hari ke dua
  const [labelHariTiga, setLabelHariTiga] = useState(null); // menyimpan nama hari ke tiga

  const [fase, setFase] = useState(); // menyimpan id fase yang dipilih
  const [faseLabel, setFaseLabel] = useState(null); // menyimpan jenis nama fase yang dipilih

  const [hari, setHari] = useState("1"); // menyimpan dan menginisialisasi hari ke berapa

  const [lamaPengobatan, setLamaPengobatan] = useState(null); // menyimpan lama pengobatan pada form

  const [selisih, setSelisih] = useState(false);
  const lastNotificationResponse = Notifications.useLastNotificationResponse(); // ambil notifikasi yang muncul

  const infoModal = async () => {
    setModalMetu(!isModalMetu);

    AsyncStorage.removeItem("alarm");
    setData(null);
    // console.log(await AsyncStorage.getItem("alarm"));
    console.log("data : " + data);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        getSelisih();
        getAlarm();
        loadAsync();
        setLoading(false);
      }, 1500);
      // console.log(loading);
    }, [refresh])
  );

  const getSelisih = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));
    fetch("https://afanalfiandi.com/ppmo/api/api.php?op=getAlarm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userData[0].id_user,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp != "0") {
          const startDate = resp.start;
          const endDate = resp.end;
          // const dateNow = moment(new Date()).format("2024-01-01");
          const dateNow = moment(new Date()).format("YYYY-MM-DD");
          const selisih = moment(dateNow).isAfter(endDate, "day");
          if (selisih == true) {
            setSelisih(true);
            setModalMetu(true);
          } else {
            setSelisih(false);
          }
        }
      });
  };
  const getAlarm = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));

    fetch("https://afanalfiandi.com/ppmo/api/api.php?op=getAlarm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userData[0].id_user,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        setTimeout(async () => {
          if (resp != 0) {
            const startDate = resp.start;
            const endDate = resp.end;
            const dateNow = moment(new Date()).format("2024-01-01");
            // const dateNow = moment(new Date()).format("YYYY-MM-DD");

            const id_alarm = resp.id_alarm;
            const id_user = resp.id_user;
            const jam = resp.jam;
            const hari = resp.hari;
            const result = [];

            if (resp.id_fase == "1") {
              result.push({
                id_alarm: id_alarm,
                id_user: id_user,
                id_fase: resp.id_fase,
                jam: jam,
                hari: hari,
                startDate: startDate,
                endDate: endDate,
              });
            } else if (resp.id_fase == "2") {
              dataHari.map((item, index) => {
                if (resp.hari_satu == item.key) {
                  AsyncStorage.setItem("labelHariSatu", item.hari);
                }
                if (resp.hari_dua == item.key) {
                  AsyncStorage.setItem("labelHariDua", item.hari);
                }
                if (resp.hari_tiga == item.key) {
                  AsyncStorage.setItem("labelHariTiga", item.hari);
                }
              });

              result.push({
                id_alarm: id_alarm,
                id_user: id_user,
                id_fase: resp.id_fase,
                jam: jam,
                hari_satu: resp.hari_satu,
                hari_dua: resp.hari_dua,
                hari_tiga: resp.hari_tiga,
                startDate: startDate,
                endDate: endDate,
              });
            } else {
              dataHari.map((item, index) => {
                if (resp.hari_satu == item.key) {
                  AsyncStorage.setItem("labelHariSatu", item.hari);
                }
                if (resp.hari_dua == item.key) {
                  AsyncStorage.setItem("labelHariDua", item.hari);
                }
                if (resp.hari_tiga == item.key) {
                  AsyncStorage.setItem("labelHariTiga", item.hari);
                }
              });

              result.push({
                id_alarm: id_alarm,
                id_user: id_user,
                id_fase: resp.id_fase,
                jam: jam,
                hari_satu: resp.hari_satu,
                hari_dua: resp.hari_dua,
                hari_tiga: resp.hari_tiga,
                startDate: startDate,
                endDate: endDate,
                lama_pengobatan: resp.lama_pengobatan,
                fase: resp.fase,
              });
            }
            setData(result);
            // AsyncStorage.setItem("alarm", JSON.stringify(result));
          } else {
            setData(null);
            // AsyncStorage.removeItem("alarm");
          }
        }, 0);
      });
  };
  // useEffect(() => {
  //   // setLoading(true);
  //   // loadAsync();
  //   // setTimeout(() => {
  //   //   getFase();

  //   //   setLoading(false);
  //   // }, 2000);

  //   if (lastNotificationResponse) {
  //     const route = JSON.stringify(
  //       lastNotificationResponse.notification.request.content.data.path
  //     );
  //     navigation.navigate("Konfirmasi");
  //     Notifications.dismissNotificationAsync(
  //       lastNotificationResponse.notification.request.identifier
  //     );
  //   }

  //   setRefresh(Math.random());
  // }, [lastNotificationResponse]);

  const modalFase = () => {
    setFaseKaton(!isFaseKaton);
  };

  const modalInfo = async () => {
    AsyncStorage.setItem("info", "1");

    setModalMetu(false);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    const time = moment(date).format("HH : mm");
    const hrs = moment(date).format("HH");
    const min = moment(date).format("mm");
    setJam(time);
    setHours(hrs);
    setMinutes(min);

    hideDatePicker();
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    getFase();
    getAlarm();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getFase = () => {
    fetch("https://afanalfiandi.com/ppmo/api/api.php?op=getFase", {})
      .then((res) => res.json())
      .then((response) => {
        setDataFase(response);
      });
  };

  const getLamaPengobatan = (id) => {
    fetch("https://afanalfiandi.com/ppmo/api/api.php?op=getFaseDetail", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((a) => a.json())
      .then((b) => {
        setLamaPengobatan(b[0].lama_pengobatan);
      });
  };

  const pilihHari = (hariNumb) => {
    if (hariAlarm.length < 3) {
      hariAlarm.push(hariNumb);
      setHariAlarm(hariAlarm);
    } else {
      ToastAndroid.show(
        "Jumlah hari yang dipilih sudah mencapai maximal!",
        ToastAndroid.SHORT
      );
    }
  };

  const renderFase = ({ item }) => (
    <View>
      <TouchableOpacity
        style={{
          height: 40,
          backgroundColor: "white",
          justifyContent: "center",
          borderRadius: 10,
          marginVertical: 4,
          alignItems: "center",
        }}
        onPress={() => {
          setFase(item.id_fase_detail);
          setFaseLabel(item.fase);
          setFaseKaton(false);
          getLamaPengobatan(item.id_fase_detail);
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 16,
            color: "black",
            // paddingLeft: 70,
            paddingVertical: 8,
            // borderColor: "grey",
            // borderWidth: 1,
            width: "100%",
            borderRadius: 10,
            backgroundColor: "white",
            textAlign: "center",
          }}
        >
          {item.fase}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const loadAsync = async () => {
    const asyncData = await AsyncStorage.getItem("alarm");
    const labelSatu = await AsyncStorage.getItem("labelHariSatu");
    const labelDua = await AsyncStorage.getItem("labelHariDua");
    const labelTiga = await AsyncStorage.getItem("labelHariTiga");

    setData(JSON.parse(asyncData));
    setLabelHariSatu(labelSatu);
    setLabelHariDua(labelDua);
    setLabelHariTiga(labelTiga);
  };
  return (
    <ScrollView
      style={[styles.container, { padding: 15 }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaView style={[styles.container, { padding: 15 }]}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={COLORS.white}
        ></StatusBar>

        <ImageBackground
          style={{ flex: 1, height: height }}
          resizeMode="cover"
          source={require("./../assets/icon/bg4.png")}
        >
          <View
            style={{
              height: 50,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.primary,
                fontFamily: "Poppins-Medium",
                fontSize: 20,
              }}
            >
              Alarm
            </Text>
          </View>

          {/* // ! ---------------------------------- Modal FASE PENGOBATAN -------------------------------------*/}
          <Modal
            isVisible={isFaseKaton}
            onBackdropPress={() => setFaseKaton(false)}
            animationOutTiming={1000}
            animationInTiming={1000}
          >
            <View style={{ alignItems: "center", flex: 0.175 }}>
              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: "yellow",
                  width: width * 0.6,
                  borderRadius: 10,
                  height: 200,
                }}
              >
                <FlatList
                  data={dataFase}
                  renderItem={renderFase}
                  keyExtractor={(item) => item.id_fase_detail}
                />
              </View>
            </View>
          </Modal>
          {/* // !-----------------------------------------------------  Modal Info ------------------------------------------------------------*/}
          <Modal
            isVisible={isModalMetu}
            onBackdropPress={() => setModalVisible(false)}
            animationOutTiming={2000}
            animationInTiming={2000}
            animationIn={"fadeIn"}
            animationOut={"fadeOut"}
            // deviceHeight={height}
            // deviceWidth={width}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                flex: 1,
                margin: -20,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  // backgroundColor: "grey",
                }}
              >
                <View
                  style={{
                    width: 140,
                    height: 140,
                    tintColor: COLORS.primary,
                    backgroundColor: "white",
                    borderRadius: 90,
                    // borderWidth: 2,
                    // borderColor: COLORS.white,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{
                      width: "95%",
                      height: "95%",
                      // tintColor: COLORS.primary,
                      // backgroundColor: "grey",
                    }}
                    source={require("./../assets/icon/modal_info.png")}
                  />
                </View>
              </View>

              <View
                style={{
                  height: 150,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-Medium",
                    fontSize: 18,
                  }}
                >
                  Fase Sebelumnya Telah Selesai
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins-LightItalic",
                    fontSize: 16,
                    color: "grey",
                    textAlign: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  Silakan setting ulang kembali alarm anda untuk fase
                  selanjutnya.
                </Text>
              </View>

              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  bottom: 50,
                }}
              >
                <TouchableOpacity style={styles.btn3} onPress={infoModal}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: "Poppins-Regular",
                    }}
                  >
                    Tutup
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* // TODO ------------------------- Modal LOADING ------------------------------------------------------------------*/}
          <Modal animationType="fade" transparent={true} visible={loading}>
            <View style={styles.modal_lodaing_style}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={{ fontFamily: "Poppins-Regular" }}>
                Loading . . .
              </Text>
            </View>
          </Modal>

          {/* // TODO ------------------------- Modal ALARM OPTIONAL ------------------------------------------------------------------*/}
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            animationOutTiming={1500}
            animationInTiming={1500}
            // animationIn={"fadeIn"}
            // animationOut={"fadeOut"}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                borderRadius: 10,
                paddingBottom: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <TouchableOpacity onPress={toggleModal}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 10,
                      marginRight: 10,
                      // backgroundColor: "yellow",
                      // padding: 10,
                      // borderRadius: 10,
                    }}
                    source={require("./../assets/icon/delete2.png")}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 80,
                }}
              >
                <View style={styles.logo_modalalarm}>
                  <Image
                    style={{
                      width: "95%",
                      height: "95%",
                    }}
                    source={require("./../assets/icon/bellblue.png")}
                  />
                </View>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={showDatePicker}
                  style={{
                    height: 120,
                    width: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontFamily: "Poppins-Bold",
                      fontSize: 80,
                    }}
                  >
                    {jam}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 22,
                }}
              >
                <Text
                  style={{
                    color: COLORS.primary,
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Pilih Hari
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                {dataHari.map((hr, index) => (
                  <TouchableOpacity
                    style={styles.boxhari_blue}
                    key={hr.key}
                    onPress={() => {
                      pilihHari(hr.key);
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white,

                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {hr.hari[0]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View
                style={{
                  height: 100,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                {/* //?-----------------JIKA FASE INTENSIF FASE CONTAINER -------------------------------------- */}
                {fase != "1" && fase != "2" && fase != "3" && (
                  <View
                    style={{
                      height: 45,
                      width: "50%",
                    }}
                  >
                    <Text style={styles.fase_judul}>Fase</Text>
                    <TouchableOpacity
                      onPress={modalFase}
                      style={styles.fase_container}
                    >
                      {fase == null && (
                        <Text style={styles.fase_text}>
                          Pilih Fase Pengobatan
                        </Text>
                      )}
                      {fase != null && (
                        <Text style={styles.fase_text}>{faseLabel}</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}

                {/* //?-----------------JIKA FASE INTENSIF FASE CONTAINER -------------------------------------- */}
                {fase == "1" && (
                  <View
                    style={{
                      height: 45,
                      width: "50%",
                    }}
                  >
                    <Text style={styles.fase_judul}>Fase</Text>
                    <TouchableOpacity
                      onPress={modalFase}
                      style={styles.fase_container}
                    >
                      {fase == null && (
                        <Text style={styles.fase_text}>
                          Pilih Fase Pengobatan
                        </Text>
                      )}
                      {fase != null && (
                        <Text style={styles.fase_text}>{faseLabel}</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}

                {/* //?-----------------JIKA FASE LANJUTAN FASE CONTAINER -------------------------------------- */}
                {fase == "2" && (
                  <View
                    style={{
                      height: 45,
                      width: "50%",
                    }}
                  >
                    <Text style={styles.fase_judul}>Fase</Text>
                    <TouchableOpacity
                      onPress={modalFase}
                      style={styles.fase_container}
                    >
                      {fase == null && (
                        <Text style={styles.fase_text}>
                          Pilih Fase Pengobatan
                        </Text>
                      )}
                      {fase != null && (
                        <Text style={styles.fase_text}>{faseLabel}</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}

                {/* //?-----------------JIKA EXTEND FASE CONTAINER -------------------------------------- */}
                {fase == "3" && (
                  <View
                    style={{
                      height: 45,
                      width: "35%",
                    }}
                  >
                    <Text style={styles.fase_judul}>Fase</Text>
                    <TouchableOpacity
                      onPress={modalFase}
                      style={styles.fase_container}
                    >
                      {fase == null && (
                        <Text style={styles.fase_text}>
                          Pilih Fase Pengobatan
                        </Text>
                      )}
                      {fase != null && (
                        <Text style={styles.fase_text}>{faseLabel}</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}

                {/* //?-----------------JIKA FASE BELUM PILIH Hari Ke CONTAINER -------------------------------------- */}
                {fase != "1" && fase != "2" && fase != "3" && (
                  <View style={styles.hari_text}>
                    <Text style={styles.fase_judul}>Hari Ke</Text>
                    <View style={styles.hari_container}>
                      <TextInput
                        textAlign="center"
                        style={{
                          fontFamily: "Poppins-Medium",
                          fontSize: 16,
                          color: "black",
                          width: 30,
                        }}
                        placeholderTextColor={black}
                        keyboardType="number-pad"
                        placeholder="0"
                        onChangeText={setHari}
                        value={hari}
                      />
                    </View>
                  </View>
                )}

                {/* //?-----------------JIKA FASE INTENSIF Hari Ke CONTAINER -------------------------------------- */}
                {fase == "1" && (
                  <View style={styles.hari_text}>
                    <Text style={styles.fase_judul}>Hari Ke</Text>
                    <View style={styles.hari_container}>
                      <TextInput
                        textAlign="center"
                        style={{
                          fontFamily: "Poppins-Medium",
                          fontSize: 16,
                          color: "black",
                          width: 30,
                        }}
                        placeholderTextColor={black}
                        keyboardType="number-pad"
                        placeholder="0"
                        onChangeText={setHari}
                        value={hari}
                      />
                    </View>
                  </View>
                )}

                {/* //?----------------- JIKA FASE LANJUTAN Hari Ke CONTAINER -------------------------------------- */}
                {fase == "2" && (
                  <View style={styles.hari_text}>
                    <Text style={styles.fase_judul}>Hari Ke</Text>
                    <View style={styles.hari_container}>
                      <TextInput
                        textAlign="center"
                        style={{
                          fontFamily: "Poppins-Medium",
                          fontSize: 16,
                          color: "black",
                          width: 30,
                        }}
                        placeholderTextColor={black}
                        keyboardType="number-pad"
                        placeholder="0"
                        onChangeText={setHari}
                        value={hari}
                      />
                    </View>
                  </View>
                )}

                {/* //?-----------------Hari Ke CONTAINER -------------------------------------- */}
                {fase == "3" && (
                  <View
                    style={{
                      width: "20%",
                      justifyContent: "center",
                      height: 45,
                      marginTop: 20,
                    }}
                  >
                    <Text style={styles.fase_judul}>Hari Ke</Text>
                    <View style={styles.hari_container}>
                      <TextInput
                        textAlign="center"
                        style={{
                          fontFamily: "Poppins-Medium",
                          fontSize: 16,
                          color: "black",
                          width: 30,
                        }}
                        placeholderTextColor={black}
                        keyboardType="number-pad"
                        placeholder="0"
                        onChangeText={setHari}
                        value={hari}
                      />
                    </View>
                  </View>
                )}

                {/* //?-----------------LAMA Hari  CONTAINER -------------------------------------- */}
                {fase == "3" && (
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      height: 45,
                      marginTop: 20,
                    }}
                  >
                    <Text style={styles.fase_judul}>Lama (Hari)</Text>
                    <View style={styles.hari_container}>
                      <TextInput
                        textAlign="center"
                        style={{
                          fontFamily: "Poppins-Medium",
                          fontSize: 16,
                          color: "black",
                          width: 30,
                        }}
                        placeholderTextColor={black}
                        keyboardType="number-pad"
                        placeholder="0"
                        onChangeText={setLamaPengobatan}
                        value={lamaPengobatan}
                      />
                    </View>
                  </View>
                )}
              </View>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 45,
                  width: "100%",
                  marginTop: 30,
                }}
              >
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={() => {
                    setLoading(true);

                    setTimeout(() => {
                      if (fase == "1") {
                        addInsentif(
                          hours,
                          minutes,
                          lamaPengobatan,
                          hari,
                          jam,
                          fase
                        );
                      } else if (fase == "2") {
                        addLanjutan(
                          hours,
                          minutes,
                          lamaPengobatan,
                          hari,
                          jam,
                          fase,
                          hariAlarm
                        );
                      } else {
                        addExtend(
                          hours,
                          minutes,
                          lamaPengobatan,
                          hari,
                          jam,
                          fase,
                          hariAlarm
                        );
                      }
                      setLoading(false);
                      toggleModal(false);
                    }, 3000);
                  }}
                >
                  <Text style={styles.btnText}>Simpan</Text>
                </TouchableOpacity>
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

          {/* //! ------------------------------------------jika loading selesai dan tidak ada data alarm -------------------------------------*/}
          {loading != true && data == null && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "35%",
                // width: "90%",
                // paddingHorizontal: 10,
              }}
            >
              <Image
                style={{ width: 230, height: 187 }}
                source={require("../assets/icon/illus_alarm.png")}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 100,
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
                  Ayo Mulai !
                </Text>
                <Text
                  style={{
                    color: "grey",
                    fontSize: 14,
                    textAlign: "center",
                    fontFamily: "Poppins-LightItalic",
                  }}
                >
                  Track record harian anda dalam kepatuhan meminum obat akan
                  muncul disini.
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.floatingbutton, { marginTop: 20 }]}
                // onPress={toggleModal}
                onPress={() => navigation.navigate("TambahAlarm")}
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
              {/* <TouchableOpacity
                style={[styles.floatingbutton, { marginTop: 20 }]}
                // onPress={toggleModal}
                onPress={infoModal}
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
                    INFO
                  </Text>
                </View>
              </TouchableOpacity> */}
            </View>
          )}
          {/* //! ------------------- jika loading selesai dan  ada data alarm -----------------------------------------------------------*/}
          {loading != true && data != null && (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                width: "90%",
                marginLeft: "5%",
                borderRadius: 10,
                marginTop: 2,
                paddingVertical: 20,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 0.4,
                elevation: 5,
              }}
              // disabled={today != null ? true : false}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "yellow",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: COLORS.primary,
                  }}
                >
                  {moment().format("dddd, Do MMMM YYYY")}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Konfirmasi")}
                >
                  <Image
                    style={{ width: 300, height: 300, marginTop: 30 }}
                    source={require("../assets/icon/alarm_yellow.png")}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    // backgroundColor: "grey",
                    borderRadius: 30,
                    width: 250,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 15,

                    // shadowColor: "#000000",
                    // shadowOffset: { width: 0, height: 2 },
                    // shadowOpacity: 0.9,
                    // shadowRadius: 3,
                    // elevation: 5,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontFamily: "Poppins-Bold",
                      fontSize: 70,
                      // backgroundColor: "grey",
                      // height: 110,
                      textAlignVertical: "center",
                    }}
                  >
                    {data[0].jam}
                  </Text>
                </View>
                {data[0].id_fase == "1" && (
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontFamily: "Poppins-Regular",
                      fontSize: 16,
                      backgroundColor: "#F2F3FC",
                      // height: 110,
                      textAlignVertical: "center",
                      borderRadius: 3,
                      paddingHorizontal: 4,
                    }}
                  >
                    Fase Insentif
                  </Text>
                )}

                {data[0].id_fase == "2" && (
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontFamily: "Poppins-Regular",
                      fontSize: 16,
                      backgroundColor: "#F2F3FC",
                      // height: 110,
                      textAlignVertical: "center",
                      borderRadius: 3,
                      paddingHorizontal: 4,
                    }}
                  >
                    Fase Lanjutan
                  </Text>
                )}

                {data[0].id_fase == "3" && (
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontFamily: "Poppins-Regular",
                      fontSize: 16,
                      backgroundColor: "#F2F3FC",
                      // height: 110,
                      textAlignVertical: "center",
                      borderRadius: 3,
                      paddingHorizontal: 4,
                    }}
                  >
                    Fase Extend
                  </Text>
                )}

                {data[0].id_fase == "1" && (
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 16,
                      color: COLORS.primary,
                      // backgroundColor: "grey",
                      marginHorizontal: 5,
                    }}
                  >
                    Setiap Hari
                  </Text>
                )}
                {data[0].id_fase == "2" && (
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 16,
                      color: COLORS.primary,
                      // backgroundColor: "grey",
                      marginHorizontal: 5,
                    }}
                  >
                    {labelHariSatu} , {labelHariDua} , {labelHariTiga}
                  </Text>
                )}

                {data[0].id_fase == "3" && (
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 16,
                      color: COLORS.primary,
                      // backgroundColor: "grey",
                      marginHorizontal: 5,
                    }}
                  >
                    {labelHariSatu} , {labelHariDua} , {labelHariTiga}
                  </Text>
                )}
              </View>
            </View>
          )}
        </ImageBackground>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AlarmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    backgroundColor: COLORS.white,
    height: 650,

    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "5%",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
  },
  jam: {
    justifyContent: "center",
    alignItems: "center",
  },
  keterangan: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gmbar_container: {
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

  centeredView_2: {
    justifyContent: "center",
    alignItems: "center",
    width: width - 20,
    height: height - 30,
    backgroundColor: "yellow",
    width: width,
    height: height,
  },
  modalView_2: {
    width: width - 20,
    height: height - 30,
    paddingTop: 85,
    backgroundColor: "white",
    borderRadius: 10,
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
    paddingTop: 50,
  },
  inputhorizontal: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 10,
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
  btn3: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 50,
    fontFamily: "Poppins-Medium",
  },
  imgContainer: {
    paddingHorizontal: width * 0.095,
    paddingTop: "30%",
  },
  formContainer: {
    paddingHorizontal: width * 0.095,
    paddingVertical: 10,
  },
  inputContainer: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3FC",
    borderRadius: 5,
  },
  input: {
    height: 50,
    borderRadius: 10,
    color: "black",
    paddingTop: 6,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  h1: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: grey,
    marginBottom: 15,
  },
  h2: {
    fontSize: 14,
    color: grey,
    fontFamily: "Poppins-Medium",
    justifyContent: "center",
    alignItems: "center",
  },
  icon_style: {
    width: 18,
    height: 18,
    tintColor: blue_icon,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "85%",
  },
  btnText: {
    fontSize: width * 0.035,
    color: "white",
    fontFamily: "Poppins-SemiBold",
  },
  boxhari_blue: {
    backgroundColor: COLORS.primary,
    width: 33,
    height: 33,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    borderRadius: 50,
  },
  boxhari_grey: {
    backgroundColor: "#F2F3FC",
    width: 33,
    height: 33,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    borderRadius: 50,
  },
  fase_container: {
    backgroundColor: "#F2F3FC",
    width: "100%",
    height: "100%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  fase_text: {
    color: "black",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    textAlign: "center",
  },
  fase_judul: {
    color: "black",
    fontFamily: "Poppins-Medium",
    fontSize: 12,
  },
  hari_container: {
    backgroundColor: "#F2F3FC",
    width: "100%",
    height: "100%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  hari_text: {
    width: "30%",
    justifyContent: "center",
    height: 45,
    marginTop: 20,
  },
  logo_modalalarm: {
    width: 140,
    height: 140,
    tintColor: COLORS.primary,
    backgroundColor: "white",
    borderRadius: 90,
    borderWidth: 2,
    borderColor: COLORS.white,
    position: "absolute",
    zIndex: 1,
    bottom: 35,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  modal_lodaing_style: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: "40%",
    left: "30%",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
  },
});
