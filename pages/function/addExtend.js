import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { ToastAndroid } from "react-native";
const addExtend = async (hours, minutes, lamaPengobatan, hari, jam, fase) => {
  const userData = JSON.parse(await AsyncStorage.getItem("userData"));

  const hrs = parseFloat(hours);
  const min = parseFloat(minutes);
  const startDate = new Date();
  const newDate = moment(startDate).format("YYYY-MM-DD");
  const endDate = moment(startDate).add(lamaPengobatan, "days").toDate();
  const newEndDate = moment(endDate).format("YYYY-MM-DD");

  // // insert
  fetch("https://afanalfiandi.com/ppmo/api/api.php?op=insAlarm", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: userData[0].id_user,
      hari: hari,
      jam: jam,
      fase: fase,
      start: newDate,
      end: newEndDate,
    }),
  })
    .then((res) => res.json())
    .then((resp) => {
      //   console.warn(resp);
      setTimeout(async () => {
        if (resp == 1) {
          //   schedulePushNotification(hrs, min);
          // Alert.alert("", "Alarm berhasil ditambahkan");
          ToastAndroid.show("Alarm Berhasil Ditambahkan!", ToastAndroid.SHORT);
        } else {
          // Alert.alert("", "Alarm gagal ditambahkan");
          ToastAndroid.show("Alarm Gagal Ditambahkan!", ToastAndroid.SHORT);
        }
      }, 2000);
    });
};

export default addExtend;
