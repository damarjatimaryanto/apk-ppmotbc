import {
  StyleSheet,
  PermissionsAndroid,
  Modal,
  ActivityIndicator,
  Text,
  Image,
  View,
  Animated,
  Alert,
  TouchableOpacity,
  Button,
  StatusBar,
  AppRegistry,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
const actions = [
  {
    text: "Buat Alarm",
    icon: require("../assets/icon/alarm.png"),
    name: "Buat Alarm",
    position: 2,
  },
];
const COLORS = { primary: "#1E319D", white: "#FFFFFF" };
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const Konfirmasi = () => {
  const navigation = useNavigation();
  const [shouldShow, setShouldShow] = useState(true);
  const [loading, setLoading] = useState(true);
  const [hari, setHari] = useState("");

  const [obat, setObat] = useState([
    {
      id_obat_detail: null,
      id_jenis_obat_detail: null,
      obat: null,
      fase: null,
      jenis_obat: null,
      waktu_minum: null,
    },
  ]);
  const [userSession, setUserSession] = useState([
    {
      uid: null,
      fase: null,
      id_kat: null,
      kategori: null,
      nama: null,
      username: null,
    },
  ]);

  const getSession = async () => {
    const uid = await AsyncStorage.getItem("uid");
    const fase = await AsyncStorage.getItem("fase");
    const id_fase = await AsyncStorage.getItem("id_fase");
    const id_kat = await AsyncStorage.getItem("id_kat");
    const kategori = await AsyncStorage.getItem("kategori");
    const nama = await AsyncStorage.getItem("nama");
    const username = await AsyncStorage.getItem("username");

    const session = [];
    session.push({
      uid: uid,
      fase: fase,
      id_fase: id_fase,
      id_kat: id_kat,
      kategori: kategori,
      nama: nama,
      username: username,
    });

    setUserSession(session);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const getObat = () => {
    const id_fase = userSession[0].id_fase;

    fetch("https://afanalfiandi.com/ppmo/api/api.php?op=getObat", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id_fase,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        setObat(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getHari = async () => {
    const id = await AsyncStorage.getItem("uid");
    const id_fase = userSession[0].id_fase;
    fetch("https://afanalfiandi.com/ppmo/api/api.php?op=getHari", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        fase: id_fase,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        if (resp.msg == "riwayat") {
          var a = parseFloat(resp.hari) + 1;
          setHari(a);
        } else {
          var b = parseFloat(resp.hari);
          setHari(b);
        }
      })
      .catch((e) => {
        console.warn("error");
      });
  };
  const onSubmit = async () => {
    const date = new Date();
    const id = userSession[0].uid;
    const status = 1;
    const day = hari;
    const tgl = moment(date).format("YYYY-MM-DD");
    const fase = await AsyncStorage.getItem("id_fase");
    const kategori = await AsyncStorage.getItem("id_kat");

    fetch("https://afanalfiandi.com/ppmo/api/api.php?op=submitAlarm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        status: status,
        hari: day,
        tgl: tgl,
        fase: fase,
        kategori: kategori,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        setLoading(true);
        setTimeout(() => {
          if (resp == "1") {
            Alert.alert("", "Konfirmasi Berhasil", [
              {
                text: "OK",
                onPress: () => {
                  navigation.reset({
                    routes: [
                      {
                        name: "AlarmScreen",
                      },
                    ],
                  });
                },
              },
            ]);
          } else {
            Alert.alert("", "Konfirmasi Gagal", [
              {
                text: "OK",
              },
            ]);

            setLoading(false);
          }
        }, 2000);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      getHari();
      getSession();
      getObat();
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      {loading == true && (
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
              height: 60,
              width: "40%",
              left: "30%",
              top: "40%",
              backgroundColor: "white",
              borderRadius: 10,
              borderColor: "#ddd",
              borderBottomWidth: 0,
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.9,
              shadowRadius: 3,
              elevation: 5,
            }}
          >
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={{ fontFamily: "Poppins-Regular" }}>Loading</Text>
          </View>
        </Modal>
      )}

      <View
        style={{
          // backgroundColor: "yellow",
          height: 50,
          width: width,
          flexDirection: "row",
          // paddingTop: 10,
          // alignItems: "center",
          // justifyContent: "center",
          marginBottom: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("AlarmScreen")}
          style={{
            // backgroundColor: "green",
            width: "15%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            // paddingTop: 20,
          }}
        >
          <AntDesign name="arrowleft" size={25} color={COLORS.primary} />
        </TouchableOpacity>
        <View
          style={{
            // backgroundColor: "yellow",
            width: "70%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            // paddingTop: 20,
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: "Poppins-Medium",
              fontSize: 20,
            }}
          >
            Konfirmasi
          </Text>
        </View>
      </View>
      <View style={styles.box}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={styles.judul_style}>
            <Text style={styles.judul_isi}>Hari Ke</Text>
          </View>
          <View style={styles.ket_style}>
            <Text style={styles.ket_isi}>: {hari}</Text>
          </View>
        </View>
      </View>
      <View style={styles.box}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={styles.judul_style}>
            <Text style={styles.judul_isi}>Kategori</Text>
          </View>
          <View style={styles.ket_style}>
            <Text style={styles.ket_isi}>: {userSession[0].kategori}</Text>
          </View>
        </View>
      </View>

      <View style={styles.box}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={styles.judul_style}>
            <Text style={styles.judul_isi}>Fase </Text>
          </View>
          <View style={styles.ket_style}>
            {userSession[0].id_fase == "1" && (
              <Text style={styles.ket_isi}>: Fase Insentif</Text>
            )}
            {userSession[0].id_fase == "2" && (
              <Text style={styles.ket_isi}>: Fase Lanjutan</Text>
            )}
            {userSession[0].id_fase == "3" && (
              <Text style={styles.ket_isi}>: Fase Extend</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.box_2}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={styles.judul_style}>
            <Text style={styles.judul_isi}>Obat</Text>
          </View>
          <View style={styles.ket_style}>
            {obat.map((item) => (
              <View key={item.id_obat_detail}>
                <Text style={styles.ket_isi}>: {item.obat}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.box}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={styles.judul_style}>
            <Text style={styles.judul_isi}>Jenis Obat</Text>
          </View>
          <View style={styles.ket_style}>
            <Text style={styles.ket_isi}>: {obat[0].jenis_obat}</Text>
          </View>
        </View>
      </View>
      <View style={styles.box}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={styles.judul_style}>
            <Text style={styles.judul_isi}>Waktu Minum Obat</Text>
          </View>
          <View style={styles.ket_style}>
            <Text style={[styles.ket_isi, { textTransform: "capitalize" }]}>
              : {obat[0].waktu_minum}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={onSubmit} style={styles.floatingbutton}>
        <Text
          style={{
            color: COLORS.white,
            fontFamily: "Poppins-Regular",
            fontSize: 16,
          }}
        >
          Konfirmasi
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Konfirmasi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    // justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },

  textbtn: {
    fontSize: 16,
    color: "white",
  },
  floatingbutton: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    // // right: 20,
    width: width - 50,
    // marginHorizontal: 20,
    height: 50,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  box: {
    backgroundColor: "#FFFFFF",
    width: width * 0.95,
    paddingHorizontal: "2%",
    marginTop: 2,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    // borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.4,

    elevation: 5,
  },
  box_2: {
    backgroundColor: "#FFFFFF",
    width: width * 0.95,
    paddingHorizontal: "2%",
    marginTop: 2,
    padding: 10,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.4,
    elevation: 5,
  },
  box_image: {
    // backgroundColor: 'grey',
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  img_style: { height: 20, width: 20, tintColor: "black" },
  img_style_2: { height: 20, width: 20 },
  judul_style: {
    // backgroundColor: 'green',
    width: "40%",
    // justifyContent: "center",
  },
  judul_isi: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "grey",
  },
  ket_style: {
    // backgroundColor: 'blue',
    justifyContent: "center",
    paddingRight: 5,
  },
  ket_isi: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    textAlign: "left",
    color: COLORS.primary,
  },
});
