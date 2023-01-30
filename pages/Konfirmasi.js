import {
  StyleSheet,
  PermissionsAndroid,
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
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

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

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={styles.judul_style}>
            <Text style={styles.judul_isi}>Kategori : </Text>
          </View>
          <View style={styles.ket_style}>
            <Text style={styles.ket_isi}>Pasien Baru</Text>
          </View>
        </View>
      </View>

      <View style={styles.box}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={styles.judul_style}>
            <Text style={styles.judul_isi}>Fase : </Text>
          </View>
          <View style={styles.ket_style}>
            <Text style={styles.ket_isi}>Fase Intensif</Text>
          </View>
        </View>
      </View>

      <View style={styles.box_2}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={styles.judul_style}>
            <Text style={styles.judul_isi}>Jenis Obat : </Text>
          </View>
          <View style={styles.ket_style}>
            <Text style={styles.ket_isi}>Heroin</Text>
            <Text style={styles.ket_isi}>Paracetamol</Text>
            <Text style={styles.ket_isi}>Morfin</Text>
            <Text style={styles.ket_isi}>Dekstro</Text>
            <Text style={styles.ket_isi}>Bodrex</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("AlarmScreen")}
        style={styles.floatingbutton}
      >
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
    </View>
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
    height: 130,
    paddingTop: 10,
    // justifyContent: "center",
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
  img_style: { height: 20, width: 20, tintColor: "black" },
  img_style_2: { height: 20, width: 20 },
  judul_style: {
    // backgroundColor: 'green',
    width: "40%",
    // justifyContent: "center",
  },
  judul_isi: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "grey",
  },
  ket_style: {
    // backgroundColor: 'blue',
    width: "50%",
    justifyContent: "center",
    paddingRight: 5,
  },
  ket_isi: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    textAlign: "left",
    color: COLORS.primary,
  },
});
