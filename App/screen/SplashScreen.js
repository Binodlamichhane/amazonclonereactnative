import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import {getAllKeys, getData, storeData} from '../utils/AsyncStorage';
import OtpVerificationPage from './OptVerificationPage';
import url from '../utils/Constant.js';
const SplashScreen = ({navigation}) => {
  const verifytoken = async () => {
    await storeData('otpVerified', 'false');

    const token = await getData('token');
    console.log('tokendat', token);
    if (token) {
      console.log(`${url}/api/user`);
      const response = await axios.get(`${url}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('responsestatus',response);
      switch (response.status) {
        case 401:
          navigation.navigate('LoginPage');
        case 200:
          navigation.navigate('BottomTab', {userData: response.data});
      }
      navigation.navigate('BottomTab');
    } else navigation.navigate('LoginPage');
  };
  useEffect(() => {
    verifytoken();
  });

  return (
    <View style={styles.outerContainer}>
      <Image
        source={require('../assets/image/logo/ecommerce_logo.png')}
        style={{height: 150, width: 150}}
      />
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
