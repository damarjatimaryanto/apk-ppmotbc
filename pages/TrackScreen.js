import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  BackHandler,
  Alert,
  StatusBar,
  Dimensions,
} from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Calendar } from "react-native-calendars";
import { useFonts } from "expo-font";

const COLORS = { primary: "#1E319D", white: "#FFFFFF", abu1: "#F6F6F6" };
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
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
      {/* <View
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
      </View> */}

      <View
        style={{
          width: width - 15,
          paddingTop: 10,
          shadowColor: "black",
          // borderRadius: 5,
          // shadowOffset: {
          //   width: 0,
          //   height: 4,
          // },
          // shadowOpacity: 0.3,
          // shadowRadius: 0.4,

          // elevation: 5,
        }}
      >
        <Calendar
          style={{
            backgroundColor: "white",
            padding: 10,
            shadowColor: "black",
            borderRadius: 5,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 0.4,

            elevation: 5,
            paddingTop: 15,
            // height: 700,
            borderWidth: 4,
            borderColor: COLORS.abu1,
          }}
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
      </View>

      <View
        style={{
          // backgroundColor: "yellow",
          justifyContent: "center",
          alignItems: "center",
          height: 100,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "space-between",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "yellow",
          }}
        >
          <View
            style={{
              backgroundColor: "grey",
              height: 30,
              width: 30,
              margin: 5,
              borderRadius: 5,
            }}
          ></View>
          <Text
            style={{
              margin: 5,
              fontFamily: "Poppins-Regular",
            }}
          >
            Tidak Minum Obat
          </Text>
          <View
            style={{
              backgroundColor: COLORS.primary,
              height: 30,
              width: 30,
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
  );
};

export default TrackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.abu1,
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
