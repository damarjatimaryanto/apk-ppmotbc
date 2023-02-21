import * as Notifications from "expo-notifications";

const pushScheduled = async (hrs, min, day) => {
  // console.log("jam : " + hrs, " min : " + min, " day : " + day);
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  await Notifications.setNotificationChannelAsync("Minum Obat", {
    name: "Notifikasi Pengingat Minum Obat",
    importance: Notifications.AndroidImportance.HIGH,
    sound: "sound.wav",
  });
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Waktunya Minum Obat",
      body: "Lakukan Konfirmasi dengan menekan notifikasi ini",
      data: { path: "Konfirmasi" },
      shouldPlaySound: true,
      sound: "default",
    },
    trigger: {
      weekday: day,
      hour: hrs,
      minute: min,
      repeats: true,
      channelId: "ppmo-tbc-",
    },
  });
  await Notifications.setNotificationCategoryAsync("ppmo-tbc", [
    {
      actionId: "konfirmasi",
      buttonTitle: "Konfirmasi",
    },
  ]);
};

export default pushScheduled;
