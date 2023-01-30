import {
  StyleSheet,
  PermissionsAndroid,
  Text,
  Image,
  View,
  Animated,
  Alert,
  StatusBar,
} from "react-native";
import React, { useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COLORS = { primary: "#1E319D", white: "#FFFFFF" };
const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn();
    navig();
  }, []);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4500,
      useNativeDriver: true,
    }).start();
  };

  const navig = async () => {
      const loggedIn = await AsyncStorage.getItem("loggedIn");
      const intro = await AsyncStorage.getItem("intro");

      if (intro == 1 && loggedIn == 1) {
        navigation.navigate("Tab1");
      } else if (intro != 1 && loggedIn != 1) {
        navigation.navigate("IntroScreen");
      } else if (intro == 1 && loggedIn != 1) {
        navigation.navigate("LoginScreen");
      } else {
    navigation.navigate("IntroScreen");
      }
  };

  // const cekAsync = async () => {
  //   const intro = await AsyncStorage.getItem("intro");
  //   const user = await AsyncStorage.getItem("loggedIn");

  //   console.warn(intro);
  // };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary}></StatusBar>
      <Image
        style={{ width: 90, height: 73 }}
        source={require("../assets/icon/logoobat.png")}
      ></Image>
      <Text style={styles.splash_title}>PPMO TBC</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  splash_title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: "5%",
  },
});
