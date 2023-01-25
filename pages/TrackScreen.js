import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  BackHandler,
  Alert,
  StatusBar,
} from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Calendar } from "react-native-calendars";
import { useFonts } from "expo-font";

const COLORS = { primary: "#1E319D", white: "#FFFFFF" };
const TrackScreen = () => {
  // const [fontsLoaded] = useFonts({
  //   "Poppins-Bold": require("./../assets/fonts/Poppins-Bold.ttf"),
  //   "Poppins-Regular": require("./../assets/fonts/Poppins-Regular.ttf"),
  //   "Poppins-SemiBold": require("./../assets/fonts/Poppins-SemiBold.ttf"),

  //   "Poppins-LightItalic": require("./../assets/fonts/Poppins-LightItalic.ttf"),
  // });
  // if (!fontsLoaded) {
  //   return null;
  // }
  return (
    <View style={styles.container}>
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
          style={{ width: 250, height: 138 }}
          source={require("../assets/icon/illus_calendar.png")}
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
              fontSize: 20,
              fontFamily: "Poppins-Regular",
            }}
          >
            Melihat progress anda dengan mudah
          </Text>
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              textAlign: "center",
              fontFamily: "Poppins-LightItalic",
            }}
          >
            Track record harian anda dalam kepatuhan meminum obat akan muncul
            disini.
          </Text>
        </View>
      </View>

      {/* <Calendar
        style={{ backgroundColor: COLORS.white }}
        theme={{
          backgroundColor: COLORS.white,
          calendarBackground: COLORS.white,
          textSectionTitleColor: COLORS.primary,
          textSectionTitleDisabledColor: "green",
          selectedDayBackgroundColor: "red",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: COLORS.primary,
          textDisabledColor: "grey",
          dotColor: "red",
          selectedDotColor: "#ffffff",
          arrowColor: COLORS.primary,
          disabledArrowColor: "#d9e1e8",
          monthTextColor: COLORS.primary,
          indicatorColor: COLORS.primary,
          textDayFontFamily: "Poppins-Regular",
          textMonthFontFamily: "Poppins-Regular",
          textDayHeaderFontFamily: "Poppins-Regular",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14,
        }}
        markingType={"period"}
        markedDates={{
          "2023-01-04": {
            disabled: true,
            startingDay: true,
            color: "red",
            endingDay: true,
            textColor: "white",
          },
          "2023-01-05": {
            disabled: true,
            startingDay: true,
            color: COLORS.primary,
            endingDay: true,
            textColor: "white",
          },
        }}
      />
      <View style={styles.keterangan}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: COLORS.primary,
            borderRadius: 35,
            marginRight: 20,
          }}
        ></View>
        <Text style={styles.judulketerangan}>Minum Obat</Text>
      </View>
      <View style={styles.keterangan}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: "red",
            borderRadius: 35,
            marginRight: 20,
          }}
        ></View>
        <Text style={styles.judulketerangan}>Tidak Minum Obat</Text>
      </View> */}
    </View>
  );
};

export default TrackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
    // justifyContent: "center",
    alignItems: "center",
  },
  keterangan: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  judulketerangan: {
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: "Poppins-Regular",
  },
});
