import AsyncStorage from "@react-native-async-storage/async-storage";

const getAlarm = async () => {
  const userData = JSON.parse(await AsyncStorage.getItem("userData"));

  fetch("https://afanalfiandi.com/ppmo/api/api.php?op=getAlarm", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: userData[0].id_user,
    }),
  })
    .then((res) => res.json())
    .then((resp) => {
      setTimeout(async () => {
        const userSession = [];
        if (resp != 0) {
          // console.warn("data ada");
          //       const startDate = resp.start;
          //       const endDate = resp.end;
          //       // const dateNow = moment(new Date()).format("2024-01-01");
          //       const dateNow = moment(new Date()).format("YYYY-MM-DD");
          //       const selisih = moment(dateNow).isAfter(endDate, "day");
          //       if (selisih == true) {
          //         setData(null);
          //         setModalMetu(true);
          //       } else {
          //         const id_alarm = resp.id_alarm;
          //         const id_user = resp.id_user;
          //         const jam = resp.jam;
          //         const hari = resp.hari;
          //         const result = [];
          //         if (resp.id_fase == "1") {
          //           result.push({
          //             id_alarm: id_alarm,
          //             id_user: id_user,
          //             id_fase: resp.id_fase,
          //             jam: jam,
          //             hari: hari,
          //             startDate: startDate,
          //             endDate: endDate,
          //           });
          //         } else if (resp.id_fase == "2") {
          //           dataHari.map((item, index) => {
          //             if (resp.hari_satu == item.key) {
          //               setLabelHariSatu(item.hari);
          //             }
          //             if (resp.hari_dua == item.key) {
          //               setLabelHariDua(item.hari);
          //             }
          //             if (resp.hari_tiga == item.key) {
          //               setLabelHariTiga(item.hari);
          //             }
          //           });
          //           result.push({
          //             id_alarm: id_alarm,
          //             id_user: id_user,
          //             id_fase: resp.id_fase,
          //             jam: jam,
          //             hari_satu: resp.hari_satu,
          //             hari_dua: resp.hari_dua,
          //             hari_tiga: resp.hari_tiga,
          //             startDate: startDate,
          //             endDate: endDate,
          //           });
          //         } else {
          //           dataHari.map((item, index) => {
          //             if (resp.hari_satu == item.key) {
          //               setLabelHariSatu(item.hari);
          //             }
          //             if (resp.hari_dua == item.key) {
          //               setLabelHariDua(item.hari);
          //             }
          //             if (resp.hari_tiga == item.key) {
          //               setLabelHariTiga(item.hari);
          //             }
          //           });
          //           result.push({
          //             id_alarm: id_alarm,
          //             id_user: id_user,
          //             id_fase: resp.id_fase,
          //             jam: jam,
          //             hari_satu: resp.hari_satu,
          //             hari_dua: resp.hari_dua,
          //             hari_tiga: resp.hari_tiga,
          //             startDate: startDate,
          //             endDate: endDate,
          //             lama_pengobatan: resp.lama_pengobatan,
          //             fase: resp.fase,
          //           });
          //         }
          //   setData(result);
          //       }
        } else {
          //   setData(null);
        }
      }, 2000);
    });
};

export default getAlarm;
