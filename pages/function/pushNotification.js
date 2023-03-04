import * as Notifications from "expo-notifications";

const pushNotification = async (hrs, min) => {
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
      categoryIdentifier: "ppmo-tbc",
      sound: "default",
      channelId: "ppmo-tbc",
    },
    trigger: {
      hour: parseFloat(hrs),
      minute: parseFloat(min),
      repeats: true,
      channelId: "ppmo-tbc",
    },
  });

  await Notifications.setNotificationCategoryAsync("ppmo-tbc", [
    {
      actionId: "konfirmasi",
      buttonTitle: "Konfirmasi",
    },
  ]);
};

export default pushNotification;
