import { StatusBar } from "expo-status-bar";

import {
  Text,
  View,
  Image,
  StyleSheet,
  BackHandler,
  Alert,
  Button,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useRef, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";

// import Home from './pages/Home';
import SplashScreen from "./pages/SplashScreen";
import IntroScreen from "./pages/IntroScreen";
import TrackScreen from "./pages/TrackScreen";
import LoginScreen from "./pages/LoginScreen";
import AlarmScreen from "./pages/AlarmSreen";
// import BuatalarmScreen from './pages/BuatalarmScreen';
import RegisterScreen from "./pages/RegisterScreen";
// import Akun from './pages/Akun';
import AkunScreen from "./pages/AkunScreen";
import Konfirmasi from "./pages/Konfirmasi";

const COLORS = { primary: "#225AEB", white: "#FFFFFF" };
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-LightItalic": require("./assets/fonts/Poppins-LightItalic.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: "Poppins-Medium",
            color: COLORS.primary,
          },
          headerTitleAlign: "center",
          headerTintColor: COLORS.primary,
        }}
      >
        <Stack.Screen
          name="Tab1"
          component={Tab1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IntroScreen"
          component={IntroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Konfirmasi" component={Konfirmasi} />
        {/* <Stack.Screen
          name="BuatalarmScreen"
          component={BuatalarmScreen}
          options={{
            title: 'Tambah Alarm',
            headerShadowVisible: false,
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
export function Tab1() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: "Poppins-Medium",
          color: COLORS.white,
        },
        headerStyle: {
          backgroundColor: "#1E319D",
        },
        headerTitleAlign: "center",
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1E319D",
          position: "absolute",
          // bottom: 15,
          // left: 20,
          // right: 20,
          // elevation: 0,
          // borderRadius: 15,
          height: 65,
          // ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="AlarmScreen"
        component={AlarmScreen}
        options={{
          title: "Alarm",
          // tabBarStyle: {display: 'none'},
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.buttonicon}>
                <Image
                  source={
                    focused
                      ? require("./assets/icon/bell_fill.png")
                      : require("./assets/icon/bell.png")
                  }
                  resizeMode="contain"
                  style={{
                    alignItems: "center",
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#FFFFFF" : "#B2B6C1",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#FFFFFF" : "#B2B6C1",
                    fontSize: 13,
                    alignItems: "center",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Alarm
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="TrackScreen"
        component={TrackScreen}
        options={{
          title: "Progress",
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.buttonicon}>
                <Image
                  source={
                    focused
                      ? require("./assets/icon/chart_fill.png")
                      : require("./assets/icon/chart.png")
                  }
                  resizeMode="contain"
                  style={{
                    alignItems: "center",
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#FFFFFF" : "#B2B6C1",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#FFFFFF" : "#B2B6C1",
                    fontSize: 13,
                    alignItems: "center",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Progress
                </Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="AkunScreen"
        component={AkunScreen}
        options={{
          title: "Akun",
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.buttonicon}>
                <Image
                  source={
                    focused
                      ? require("./assets/icon/person_fill.png")
                      : require("./assets/icon/person.png")
                  }
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#FFFFFF" : "#B2B6C1",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#FFFFFF" : "#B2B6C1",
                    fontSize: 13,
                    alignItems: "center",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Akun
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 50,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  buttonicon: {
    alignItems: "center",
  },
});
