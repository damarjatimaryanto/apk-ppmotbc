import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  Animated,
  Alert,
  StatusBar,
  Button,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import Modal from "react-native-modal";

const COLORS = { primary: "#1E319D", white: "#FFFFFF" };
const IntroScreen = () => {
  const navigation = useNavigation();
  // const [fontsLoaded] = useFonts({
  //   "Poppins-Bold": require("./../assets/fonts/Poppins-Bold.ttf"),
  //   "Poppins-Regular": require("./../assets/fonts/Poppins-Regular.ttf"),
  //   "Poppins-SemiBold": require("./../assets/fonts/Poppins-SemiBold.ttf"),

  //   "Poppins-LightItalic": require("./../assets/fonts/Poppins-LightItalic.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  const onStart = async () => {
    try {
      await AsyncStorage.setItem("intro", "1");
      navigation.navigate("LoginScreen");
    } catch (e) {
      // saving error
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.logo_container}>
        <Image
          style={{ width: 90, height: 73 }}
          source={require("../assets/icon/logoobat_biru.png")}
        ></Image>
      </View>
      <View style={{ width: "100%", height: "20%", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            color: COLORS.primary,
            fontSize: 40,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Selamat Datang
        </Text>
        <Text style={styles.subtitle}>
          Tekan tombol mulai untuk masuk ke dalam aplikasi PPMO TBC
        </Text>
      </View>
      <View style={{ top: 40 }}>
        <TouchableOpacity
          style={[styles.btn]}
          onPress={() => {
            onStart();
          }}
        >
          <Text
            style={{
              fontSize: 20,
              // fontWeight: "bold",
              color: COLORS.primary,
              fontFamily: "Poppins-SemiBold",
            }}
          >
            Mulai
          </Text>
        </TouchableOpacity>
      </View>

      {/* <Button
        style={{ marginTop: 30 }}
        title="Show modal"
        onPress={toggleModal}
      />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationOutTiming={1000}
        animationInTiming={1000}
      >
        <View style={{ backgroundColor: "blue" }}>
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal> */}
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",

    alignItems: "center",
  },
  logo_container: {
    height: "45%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "30%",
  },

  splash_title: {
    fontSize: 35,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: "5%",
    fontFamily: "Poppins-Regular",
  },
  subtitle: {
    color: "grey",
    fontSize: 16,
    marginTop: 10,
    maxWidth: "90%",
    textAlign: "center",
    // lineHeight: 23,
    fontFamily: "Poppins-Regular",
  },
  title: {
    color: COLORS.primary,
    fontSize: 45,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  btn: {
    borderRadius: 5,
    height: 50,
    width: 120,
    borderColor: COLORS.primary,
    borderWidth: 3,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    // fontFamily: "Poppins-Regular",
  },
});
