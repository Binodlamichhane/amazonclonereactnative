import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import url from '../utils/Constant.js';
import {getData} from '../utils/AsyncStorage';
import {useDispatch} from 'react-redux';
import Loader, { CustomLoader ,AddressLoader} from '../utils/Loader.js';
import { relative } from 'path';

const AddressPage = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAddress = async () => {
    setIsLoading(true);
    const userId = await getData('userId');
    console.log('userdi', userId);
    const response = await axios.get(`${url}/api/user/address/${userId}`);

    if (response.data.data.length !== 0) {
      let array1 = [];
      console.log(
        'response address form addresspage',
        response.data.data[0].shippingAddress,
      );
      for (let x of response.data.data[0].shippingAddress) {
        console.log('binod');
        array1.push(x);
      }
      setAddress(array1);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getAddress();
  }, []);
  return (
    <View style={{flex:1}}>
      <View
        style={{
          height: 55,
          backgroundColor: '#77a69e',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 5, paddingRight: 10}}>
          <Image
            source={require('../assets/image/backicon/back-icon.png')}
            style={{height: 20, width: 20}}
          />
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderRadius: 10,
            margin: 5,
            paddingHorizontal: 10,
            backgroundColor: 'white',
          }}>
          <Image
            source={require('../assets/image/searchicon/search_icon.png')}
          />
          <TextInput
            style={{width: 270, color: 'black'}}
            placeholder="Search Amazon.in"
          />
          <Image
            source={require('../assets/image/microphone/microphone.png')}
            style={{height: 20, width: 20}}
          />
        </View>
      </View>
      {isLoading?<AddressLoader/>:null}
      <View style={{margin: 5}}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}>
          Your Address
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('AddressForm');
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            padding: 15,
            marginHorizontal: 10,
            marginVertical: 5,
            borderRadius: 9,
            borderColor: '#d6d4c9',
          }}>
          <Text>Add a new Address</Text>
          <Image
            source={require('../assets/image/rightarrow/rightarrow.png')}
            style={{height: 20, width: 20}}
          />
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            padding: 15,
            marginHorizontal: 10,
            marginVertical: 5,
            borderRadius: 9,
            borderColor: '#d6d4c9',
          }}>
          <Text>Add a new Pickup location</Text>
          <Image
            source={require('../assets/image/rightarrow/rightarrow.png')}
            style={{height: 20, width: 20}}
          />
        </View>
        {address.map(item => (
          <View key={item._id} style={{position:'relative'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Personal Address
            </Text>
            <View
              style={{
                borderWidth: 1,
                margin: 5,
                borderRadius: 10,
                borderColor: '#d6d4c9',
                borderColor: '#d6d4c9',
              }}>
              <View style={{margin: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderColor: '#d6d4c9',
                    height: 30,
                  }}>
                  <Text>{item.addressType}:</Text>
                  <Image
                    source={require('../assets/image/amazonlogo/amazonlogo.png')}
                    style={{height: 25, width: 40}}
                  />
                </View>
                <View>
                  <Text style={{fontWeight: 'bold', color: 'black'}}>
                    {item.fullname}
                  </Text>
                  <Text style={{color: 'black'}}>{item.houseNo}</Text>
                  <Text style={{color: 'black'}}>
                    {item.city},{item.state},{item.postalCode}
                  </Text>
                  <Text style={{color: 'black'}}>India</Text>
                  <Text style={{color: 'black'}}>
                    Phone number:{item.mobileNo}
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 8}}>
                    <Image
                      source={require('../assets/image/locationpointer/locationpointer.png')}
                      style={{
                        height: 18,
                        width: 20,
                        resizeMode: 'contain',
                        marginRight: 2,
                      }}
                    />
                    <Text style={{color: '#3a9c95'}}>
                      Update delivery location
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 3}}>
                    <Text style={styles.boxstyle}>Edit</Text>
                    <Text style={styles.boxstyle}>Remove</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      
      </View>
    </View>
  );
};

export default AddressPage;

const styles = StyleSheet.create({
  boxstyle: {
    padding: 8,
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    borderColor: '#d6d4c9',
  },
});
