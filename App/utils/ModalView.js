import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {getData} from './AsyncStorage';
import {AddAddress} from '../Redux/addressSlice';
import {CustomLoader} from './Loader';

export default function ModalView(props) {
  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //   const [visible,setVisible]=useState(true);
  //  const address1 = useSelector(state => state.address);
  const getAddress = async () => {
    setIsLoading(true);
    const userId = await getData('userId');
    const response = await axios.get(`${url}/api/user/address/${userId}`);

    if (response.data.data.length !== 0) {
      let array1 = [];
      for (let x of response.data.data[0].shippingAddress) {
        array1.push(x);
        dispatch(AddAddress(x));
      }
      setAddress(array1);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getAddress();
    //     const unsubscribe = navigation.addListener('blur', () => {
    //         // Component is blurred, remove it from the stack
    //        props.setIsVisible(false)
    //       },[navigation]);

    //    return unsubscribe;
  }, []);
  return (
    <Modal
      isVisible={props.isVisible}
      animationIn="slideInUp"
      style={{alignItems: 'center', color: 'red'}}
      //   onBackButtonPress={() => {
      //     props.setIsVisible(!props.isVisible);
      //   }}
      onBackdropPress={() => {
        props.setIsVisible(!props.isVisible);
      }}>
      {isLoading ? <CustomLoader /> : null}
      <View
        style={{
          width: width,
          height: height / 2,
          top: 200,
          backgroundColor: 'white',
          padding: 10,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>
          Choose you Location
        </Text>
        <Text>
          Select a delivery location to see product availability and delivery
          options
        </Text>

        <View
          style={{
            alignItems: 'center',
            justifyContent:'center',
            flexDirection: 'row',
            marginTop: 20,
            paddingLeft:20
          }}>
          {address.length > 1 ? null : (
            <Pressable
              onPress={() => {
                navigation.navigate('AddressPage');
              }}
              style={{
                width: width / 2.5,
                height: height / 4,
                borderWidth: 1,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 5,
              }}>
              <Text style={{color: 'blue'}}>new addressr</Text>
              <Text style={{color: 'blue'}}>pick-up point</Text>
            </Pressable>
          )}
          <FlatList
            data={address}
            keyExtractor={item => item.street}
            numColumns={2}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  props.setIsVisible(false);
                  navigation.navigate('AddressPage');
                }}
                style={{
                  width: width / 2.5,
                  height: height / 4,
                  borderWidth: 1,
                  borderRadius: 5,
                  justifyContent: 'center',
                  backgroundColor:'white',
                  alignItems: 'center',
                  marginLeft: 5,
                  elevation:20,
                  shadowColor: '#77a69e',
                }}>
                <View style={{justifyContent: 'center'}}>
                  <Text style={{color: 'blue'}}>{item.fullname}</Text>
                  <Text style={{color: 'blue'}}>
                    {item.street} {item.houseNo}
                  </Text>
                  <Text>
                    {item.city} {item.postalCode}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
