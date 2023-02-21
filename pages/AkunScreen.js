import {
  StyleSheet,
  ActivityIndicator,
  Text,
  Image,
  View,
  Modal,
  Animated,
  Alert,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
// import { PieChart } from "react-native-gifted-charts";
import PieChart from "react-native-expo-pie-chart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const COLORS = { primary: "#1E319D", white: "#FFFFFF", abu1: "#F6F6F6" };

const AkunScreen = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const data = [
    {
      key: "First Data",
      count: 20,
      color: "grey",
    },
    {
      key: "Second Data",
      count: 40,
      color: COLORS.primary,
    },
    // {
    //   key: "Third Data",
    //   count: 40,
    //   color: "green",
    // },
    // {
    //   key: "Forth Data",
    //   count: 35,
    //   color: "orange",
    // },
  ];
  const [userSession, setUserSession] = useState([
    {
      uid: null,
      id_kat: null,
      kategori: null,
      nama: null,
      username: null,
    },
  ]);

  const [total, setTotal] = useState([
    {
      key: "First Data",
      count: 15,
      color: "grey",
    },
    {
      key: "Second Data",
      count: 10,
      color: COLORS.primary,
    },
  ]);
  const getSession = async () => {
    const uid = await AsyncStorage.getItem("uid");
    const id_kat = await AsyncStorage.getItem("id_kat");
    const kategori = await AsyncStorage.getItem("kategori");
    const nama = await AsyncStorage.getItem("nama");
    const username = await AsyncStorage.getItem("username");

    const session = [];
    session.push({
      uid: uid,
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

  const onLogout = async () => {
    await AsyncStorage.removeItem("loggedIn");
    setLoading(true);
    setTimeout(() => {
      navigation.navigate("LoginScreen");
      setLoading(false);
    }, 2000);
  };
  const pieData = [
    { value: 54, color: "#177AD5", text: "54%" },
    { value: 40, color: "#79D2DE", text: "30%" },
    { value: 20, color: "#ED6665", text: "26%" },
  ];

  const getPresentase = async () => {
    const uid = await AsyncStorage.getItem("uid");
    const id_fase = await AsyncStorage.getItem("id_fase");

    fetch("https://afanalfiandi.com/ppmo/api/api.php?op=getPresentase", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uid,
        fase: id_fase,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        const result = [];

        result.push(
          {
            key: "tidak selesai",
            count: 10,
            color: "grey",
          },
          {
            key: "selesai",
            count: parseFloat(resp.total),
            color: COLORS.primary,
          }
        );
        setTotal(result);
        console.log(total);
      });
  };
  useEffect(() => {
    getSession();
    getPresentase();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
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
      {loading != true && (
        <View>
          <View>
            <Text style={{ fontFamily: "Poppins-Regular", color: "grey" }}>
              Biodata
            </Text>
          </View>
          <View style={styles.box}>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={styles.box_image}>
                <Image
                  style={styles.img_style}
                  source={require("../assets/icon/person_fill.png")}
                />
              </View>
              <View style={styles.judul_style}>
                <Text style={styles.judul_isi}>Nama</Text>
              </View>
              <View style={styles.ket_style}>
                <Text style={styles.ket_isi}>{userSession[0].nama}</Text>
              </View>
            </View>
          </View>

          <View style={styles.box}>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={styles.box_image}>
                <Image
                  style={styles.img_style}
                  source={require("./../assets/icon/at_fill.png")}
                />
              </View>
              <View style={styles.judul_style}>
                <Text style={styles.judul_isi}>Username</Text>
              </View>
              <View style={styles.ket_style}>
                <Text style={styles.ket_isi}>{userSession[0].username}</Text>
              </View>
            </View>
          </View>

          <View style={styles.box}>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={styles.box_image}>
                <Image
                  style={styles.img_style}
                  source={require("../assets/icon/kategori_fill.png")}
                />
              </View>
              <View style={styles.judul_style}>
                <Text style={styles.judul_isi}>Kategori Pasien</Text>
              </View>
              <View style={styles.ket_style}>
                <Text style={styles.ket_isi}>{userSession[0].kategori}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                color: "grey",
                marginVertical: 15,
              }}
            >
              Presentase Kesembuhan
            </Text>
          </View>
          {/* // ! --------------------------------------------- Tipe Persentase Pertama --------------- */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                width: "30%",
                height: 50,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
                borderColor: "#ddd",
                borderBottomWidth: 0,
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 5,
                flexDirection: "row",
              }}
            >
              <Text style={{ fontFamily: "Poppins-Regular" }}>Intensif</Text>
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  width: 35,
                  height: 35,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",

                  left: 95,
                  bottom: 30,
                }}
              >
                <Text style={{ color: "white", fontFamily: "Poppins-Medium" }}>
                  70%
                </Text>
              </View>
            </View>

            <View
              style={{
                width: "30%",
                height: 50,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
                borderColor: "#ddd",
                borderBottomWidth: 0,
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 5,
                flexDirection: "row",
              }}
            >
              <Text style={{ fontFamily: "Poppins-Regular" }}>Lanjutan</Text>
              <View
                style={{
                  backgroundColor: "red",
                  width: 35,
                  height: 35,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",

                  left: 95,
                  bottom: 30,
                }}
              >
                <Text style={{ color: "white", fontFamily: "Poppins-Medium" }}>
                  70%
                </Text>
              </View>
            </View>

            <View
              style={{
                width: "30%",
                height: 50,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
                borderColor: "#ddd",
                borderBottomWidth: 0,
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 5,
                flexDirection: "row",
              }}
            >
              <Text style={{ fontFamily: "Poppins-Regular" }}>Extend</Text>
              <View
                style={{
                  backgroundColor: "green",
                  width: 35,
                  height: 35,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",

                  left: 95,
                  bottom: 30,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Poppins-Medium",
                    fontSize: 14,
                  }}
                >
                  70%
                </Text>
              </View>
            </View>
          </View>

          {/* // !--------------------------------------------------- TIPE KEDUA ------------------------------------------------ */}
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                width: "30%",
                height: 150,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                borderColor: "#ddd",
                borderBottomWidth: 0,
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 5,
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  width: "100%",
                  height: "80%",
                  // borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  // position: "absolute",

                  // left: 95,
                  // bottom: 30,
                  borderTopEndRadius: 15,
                  borderTopLeftRadius: 15,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Poppins-Medium",
                    fontSize: 40,
                  }}
                >
                  70%
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  height: "20%",
                  alignItems: "center",
                  textAlignVertical: "center",
                }}
              >
                Intensif
              </Text>
            </View>

            <View
              style={{
                width: "30%",
                height: 150,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                borderColor: "#ddd",
                borderBottomWidth: 0,
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 5,
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  width: "100%",
                  height: "80%",
                  // borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  // position: "absolute",

                  // left: 95,
                  // bottom: 30,
                  borderTopEndRadius: 15,
                  borderTopLeftRadius: 15,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Poppins-Medium",
                    fontSize: 40,
                  }}
                >
                  85%
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  height: "20%",
                  alignItems: "center",
                  textAlignVertical: "center",
                }}
              >
                Lanjutan
              </Text>
            </View>

            <View
              style={{
                width: "30%",
                height: 150,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                borderColor: "#ddd",
                borderBottomWidth: 0,
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 5,
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  width: "100%",
                  height: "80%",
                  // borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  // position: "absolute",

                  // left: 95,
                  // bottom: 30,
                  borderTopEndRadius: 15,
                  borderTopLeftRadius: 15,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Poppins-Medium",
                    fontSize: 40,
                  }}
                >
                  90%
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  height: "20%",
                  alignItems: "center",
                  textAlignVertical: "center",
                }}
              >
                Extend
              </Text>
            </View>
          </View> */}

          {/* // ?--------------------------------------------------- TIPE KETIGA ------------------------------------------------ */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 10,
            }}
          >
            <View style={styles.persen_container}>
              <View style={styles.persen_circle}>
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Poppins-Medium",
                    fontSize: 40,
                  }}
                >
                  70%
                </Text>
              </View>
              <Text style={styles.persen_text}>Intensif</Text>
            </View>

            <View style={styles.persen_container}>
              <View style={styles.persen_circle}>
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Poppins-Medium",
                    fontSize: 40,
                  }}
                >
                  70%
                </Text>
              </View>
              <Text style={styles.persen_text}>Lanjutan</Text>
            </View>

            <View style={styles.persen_container}>
              <View style={styles.persen_circle}>
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Poppins-Medium",
                    fontSize: 40,
                  }}
                >
                  70%
                </Text>
              </View>
              <Text style={styles.persen_text}>Extend</Text>
            </View>
          </View>

          <View style={styles.box_keluar}>
            <TouchableOpacity
              onPress={() => {
                onLogout();
              }}
              style={{ flexDirection: "row", width: "100%" }}
            >
              <View style={styles.box_image}>
                <Image
                  style={styles.img_style_2}
                  source={require("../assets/icon/logout.png")}
                />
              </View>
              <View style={styles.judul_style}>
                <Text style={styles.judul_isi}>Keluar</Text>
              </View>
              <View style={styles.ket_style}>
                <Text style={styles.ket_isi}></Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default AkunScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    paddingTop: 10,
  },
  box: {
    backgroundColor: "#FFFFFF",
    width: width - 15,
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
    width: width - 15,
    paddingHorizontal: "2%",
    marginBottom: 15,
    height: 330,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    // borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
  },
  box_keluar: {
    backgroundColor: "#FFFFFF",
    width: width - 15,
    paddingHorizontal: "2%",
    marginTop: 2,
    height: 45,
    // position: "absolute",
    // bottom: "-90%",
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
  box_image: {
    // backgroundColor: 'grey',
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  img_style: { height: 16, width: 16, tintColor: COLORS.primary },
  img_style_2: { height: 20, width: 20 },
  judul_style: {
    // backgroundColor: 'green',
    width: "40%",
    justifyContent: "center",
    paddingTop: 5,
  },
  judul_isi: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "grey",
  },
  ket_style: {
    // backgroundColor: 'blue',
    width: "50%",
    justifyContent: "center",
    paddingRight: 5,
    paddingTop: 5,
  },
  ket_isi: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    textAlign: "right",
    color: COLORS.primary,
  },
  persen_container: {
    width: "30%",
    height: 155,
    // backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "column",
  },
  persen_circle: {
    backgroundColor: COLORS.abu1,
    width: "100%",
    height: "75%",
    borderRadius: 160,
    justifyContent: "center",
    alignItems: "center",

    marginBottom: "5%",
    borderWidth: 15,
    borderColor: COLORS.primary,

    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
  },
  persen_text: {
    fontFamily: "Poppins-Regular",
    height: "20%",
    alignItems: "center",
    textAlignVertical: "center",
    textAlign: "center",
    // backgroundColor: "white",
    width: "100%",
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    borderRadius: 5,

    // borderColor: "#ddd",
    // borderBottomWidth: 0,
    // shadowColor: "#000000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.9,
    // shadowRadius: 3,
    // elevation: 5,
  },
});
