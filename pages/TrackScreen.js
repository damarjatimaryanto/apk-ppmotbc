import React, { Component, useEffect, useState } from "react";
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
import { Calendar, Agenda } from "react-native-calendars";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";

const COLORS = { primary: "#1E319D", white: "#FFFFFF", abu1: "#F6F6F6" };
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const TrackScreen = () => {
  const [data, setData] = useState([
    {
      hari: null,
      id_riwayat: null,
      id_status_detail: null,
      id_user: null,
      tgl: null,
    },
  ]);

  const [markedDate, setMarkedDate] = useState();
  const [selectedDate, setSelectedDate] = useState("");

  const onSelectDate = async (day) => {
    const uid = await AsyncStorage.getItem("uid");
    fetch("https://afanalfiandi.com/ppmo/api/api.php?op=selectDate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uid,
        tgl: day.dateString,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp != "null") {
          setSelectedDate(resp);
        } else {
          setSelectedDate(null);
        }
      });
  };
  const getRiwayat = async () => {
    const uid = await AsyncStorage.getItem("uid");
    fetch("https://afanalfiandi.com/ppmo/api/api.php?op=getRiwayat", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uid,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        const result = [];

        resp.map((item, index) => {
          result.push({
            [item.tgl]: {
              disabled: true,
              startingDay: true,
              color: COLORS.primary,
              endingDay: true,
              textColor: "white",
            },
          });

          const output = Object.assign({}, ...result);

          setMarkedDate(output);
        });
      });
  };
  useEffect(() => {
    getRiwayat();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      {/* jika belum ada progress */}
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
          width: width - 30,
          // paddingTop: 10,
          shadowColor: "black",
          marginVertical: 15,
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
            // borderRadius: 5,
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
          markedDates={markedDate}
          onDayPress={(day) => {
            onSelectDate(day);
          }}
        />
      </View>

      {selectedDate == "" && <View></View>}
      {selectedDate != null && selectedDate != "" && (
        <View style={styles.box}>
          <View style={styles.baris}>
            <View style={styles.judul_style}>
              <Text style={styles.judul_isi}>Hari Ke</Text>
            </View>
            <View style={styles.ket_style}>
              <Text style={styles.ket_isi}>: {selectedDate.hari}</Text>
            </View>
          </View>

          <View style={styles.baris}>
            <View style={styles.judul_style}>
              <Text style={styles.judul_isi}>Kategori</Text>
            </View>
            <View style={styles.ket_style}>
              <Text style={styles.ket_isi}>: {selectedDate.kategori}</Text>
            </View>
          </View>

          <View style={styles.baris}>
            <View style={styles.judul_style}>
              <Text style={styles.judul_isi}>Fase</Text>
            </View>
            <View style={styles.ket_style}>
              <Text style={styles.ket_isi}>: {selectedDate.fase}</Text>
            </View>
          </View>
        </View>
      )}

      {selectedDate == null && (
        <View style={styles.box_2}>
          <Text style={{ fontFamily: "Poppins-Medium" }}>Data Tidak Ada</Text>
        </View>
      )}
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
  box_2: {
    backgroundColor: "#FFFFFF",
    width: width - 30,
    paddingHorizontal: "2%",
    marginTop: 2,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    borderRadius: 3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.4,

    elevation: 5,
  },
  box: {
    backgroundColor: "#FFFFFF",
    width: width - 30,
    paddingHorizontal: "2%",
    marginTop: 2,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    borderRadius: 3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.4,

    elevation: 5,
  },
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
  baris: {
    flexDirection: "row",
    width: "100%",
    // backgroundColor: "yellow",
    marginVertical: 5,
  },
});
