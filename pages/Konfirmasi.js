import {
  StyleSheet,
  PermissionsAndroid,
  Text,
  Image,
  View,
  Animated,
  Alert,
  TouchableOpacity,
  Button,
  StatusBar,
  AppRegistry,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const actions = [
  {
    text: 'Buat Alarm',
    icon: require('./../assets/img/icon/alarm.png'),
    name: 'Buat Alarm',
    position: 2,
  },
];

const Konfirmasi = () => {
  const navigation = useNavigation();
  const [shouldShow, setShouldShow] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={{color: 'black'}}>Ini Halaman Konfirmasi</Text>
    </View>
  );
};

export default Konfirmasi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#25376A',
    paddingVertical: 10,
    width: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textbtn: {
    fontSize: 16,
    color: 'white',
  },
  floatingbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 90,
    right: 20,
    // width: 100,
  },
});
