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
  // let [fontsLoaded] = useFonts({
  //   "Poppins-Bold": require("./../assets/fonts/Poppins-Bold.ttf"),
  //   "Poppins-Regular": require("./../assets/fonts/Poppins-Regular.ttf"),
  //   "Poppins-SemiBold": require("./../assets/fonts/Poppins-SemiBold.ttf"),
  //   "Poppins-Medium": require("./../assets/fonts/Poppins-Medium.ttf"),
  //   "Poppins-LightItalic": require("./../assets/fonts/Poppins-LightItalic.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }
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
      fase: null,
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
    const fase = await AsyncStorage.getItem("fase");
    const id_kat = await AsyncStorage.getItem("id_kat");
    const kategori = await AsyncStorage.getItem("kategori");
    const nama = await AsyncStorage.getItem("nama");
    const username = await AsyncStorage.getItem("username");

    const session = [];
    session.push({
      uid: uid,
      fase: fase,
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
            height: "100%",
            width: "100%",
          }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </Modal>
      {loading != true && (
        <View>
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

          <View style={styles.box}>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={styles.box_image}>
                <Image
                  style={styles.img_style}
                  source={require("../assets/icon/fase_fill.png")}
                />
              </View>
              <View style={styles.judul_style}>
                <Text style={styles.judul_isi}>Fase Pengobatan</Text>
              </View>
              <View style={styles.ket_style}>
                <Text style={styles.ket_isi}>{userSession[0].fase}</Text>
              </View>
            </View>
          </View>

          <View style={styles.box_2}>
            <View style={{ height: 50, justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: "grey",
                }}
              >
                Prosentase Kepatuhan Minum Obat
              </Text>
            </View>

            <PieChart
              data={total}
              length={200}
              rotation={-90}
              // zeroTotalCircleColor={COLORS.primary}
              centerLabelComponent={() => {
                return <Text style={{ fontSize: 30, color: "grey" }}>70%</Text>;
              }}
            />

            <View
              style={{
                // backgroundColor: "yellow",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "grey",
                    height: 20,
                    width: 20,
                    margin: 5,
                    borderRadius: 5,
                  }}
                ></View>
                <Text style={{ margin: 5, fontFamily: "Poppins-Regular" }}>
                  {" "}
                  Tidak Minum Obat
                </Text>
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    height: 20,
                    width: 20,
                    margin: 5,
                    borderRadius: 5,
                  }}
                ></View>
                <Text style={{ margin: 5, fontFamily: "Poppins-Regular" }}>
                  Minum Obat
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.box}>
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

          {/* <View style={styles.box}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Konfirmasi")}
              style={{ flexDirection: "row", width: "100%" }}
            >
              <View style={styles.box_image}>
                <Image
                  style={styles.img_style}
                  source={require("../assets/icon/logout.png")}
                />
              </View>
              <View style={styles.judul_style}>
                <Text style={styles.judul_isi}>Ke Halaman Konfirmasi</Text>
              </View>
              <View style={styles.ket_style}>
                <Text style={styles.ket_isi}></Text>
              </View>
            </TouchableOpacity>
          </View> */}
        </View>
      )}
    </View>
  );
};

export default AkunScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.abu1,
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
    marginVertical: 15,
    height: 330,
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
});
