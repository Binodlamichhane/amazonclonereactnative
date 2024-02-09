import {StyleSheet, Text, View, ScrollView, Alert,KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {InputButton} from '../components/Button';
import PressableButton from '../components/PressableButton';
import {useDispatch, useSelector} from 'react-redux';
import {AddAddress} from '../Redux/addressSlice';
import {useNavigation} from '@react-navigation/native';
import {getData} from '../utils/AsyncStorage';
import url from '../utils/Constant.js';
//
export default function AddressForm() {
  //
  const [fullname, setFullName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [landmark, setLandMark] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleAddAddress = async () => {
    const address = {
      fullname,
      mobileNo,
      houseNo,
      street,
      city,
      landmark,
      postalCode,
      state,
    };
    const userId = await getData('userId');
    console.log('userid',userId);
    const data = {userId: userId, shippingAddress: [address]};
    const response = await axios.post(
      `${url}/api/user/address`,
      data,
    );
    if (response.status === 200) {
      dispatch(AddAddress(address));
      Alert.alert('Successfully added');
    } else {
      Alert.alert('failed to add addresss');
    }
    navigation.navigate('HomePage');
  };

  return (
    <KeyboardAvoidingView style={{margin: 10}}>
      <ScrollView keyboardShouldPersistTaps='always'>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>
          Add a new Address
        </Text>
        <View>
          <Text style={{}}>Full Name:</Text>
          <InputButton
            placeholder="enter full name"
            value={fullname}
            onChangeText={text => setFullName(text)}
          />
        </View>
        <View>
          <Text style={{}}>Mobile number:</Text>
          <InputButton
            placeholder="enter full name"
            value={mobileNo}
            onChangeText={text => setMobileNo(text)}
          />
        </View>
        <View>
          <Text style={{}}>Flat,House no,Building,Company:</Text>
          <InputButton
            placeholder="houseno"
            value={houseNo}
            onChangeText={text => setHouseNo(text)}
          />
        </View>
        <View>
          <Text style={{}}>Area,Street,Sector,Village:</Text>
          <InputButton
            placeholder="sector 15 c block"
            value={street}
            onChangeText={text => setStreet(text)}
          />
        </View>
        <View>
          <Text style={{}}>city/town</Text>
          <InputButton
            placeholder="city/town"
            value={city}
            onChangeText={text => setCity(text)}
          />
        </View>
        <View>
          <Text style={{}}>landmark:</Text>
          <InputButton
            placeholder="enter full name"
            value={landmark}
            onChangeText={text => setLandMark(text)}
          />
        </View>
        <View>
          <Text style={{}}>Pincode:</Text>
          <InputButton
            placeholder="pincode"
            value={postalCode}
            onChangeText={text => setPostalCode(text)}
          />
        </View>
        <View>
          <Text style={{}}>State:</Text>
          <InputButton
            placeholder="up"
            value={state}
            onChangeText={text => setState(text)}
          />
        </View>
        <PressableButton title="Add Address" onPress={handleAddAddress} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
