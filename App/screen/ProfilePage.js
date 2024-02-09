import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  StyleSheet,
  Pressable
} from 'react-native';
import {useEffect,useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import url from '../utils/Constant.js';
import { getData } from '../utils/AsyncStorage';
import {useNavigation} from '@react-navigation/native';
const ProfilePage = () => {
  const navigation =useNavigation();
  const [orderData,setOrderData]=useState([]);
  const getOrder=async()=>{
    const userId=await getData('userId');
    const response = await axios.get(`${url}/api/order/${userId}`);
    setOrderData(response.data.data);
    console.log('hootiiiii',response.data.data[0].products[0].mainImg.image);
  }
  const orderData1 = [
    {
      id: 1,
      image:
        'https://res.cloudinary.com/dkvowpixw/image/upload/v1701872600/eye2wevryxxbsbblsybs.jpg',
    },
    {
      id: 2,
      image:
        'https://res.cloudinary.com/dkvowpixw/image/upload/v1701873999/kcabohvre2hcrb22tw1h.jpg',
    },
  ];
  useEffect(()=>{
    getOrder();
  },[])
  return (
    <View>
      <LinearGradient colors={['#77a69e', '#d3f2d9', '#f0f2ed']}>
        <View style={{height: 120}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 70,
            }}>
            <View style={{marginTop: 5}}>
              <Image
                source={require('../assets/image/amazonlogo/amazonlogo.png')}
                style={{height: 50, width: 100}}
              />
            </View>
            <View
              style={{flexDirection: 'row', marginHorizontal: 10, width: 100}}>
              <View style={{margin: 10}}>
                <Image
                  source={require('../assets/image/bellicon/bell-icon.png')}
                  style={{height: 25, width: 25, resizeMode: 'contain'}}
                />
              </View>
              <View
                style={{
                  marginLeft: 20,
                  justifyContent: 'center',
                  marginBottom: 25,
                }}>
                <Image
                  source={require('../assets/image/searchicon/search_icon.png')}
                  style={{height: 26, width: 23, resizeMode: 'contain'}}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Text style={{fontSize: 20}}>
              Hello,<Text style={{fontWeight: 'bold'}}>Binod</Text>
            </Text>
            <View>
              <Image
                source={require('../assets/image/profileicon/profileicon.png')}
                style={{height: 40, width: 40}}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
      <LinearGradient colors={['#f0f2ed', '#fcfcfc']}>
        <ScrollView
        key={Math.random*100}
          style={{height: 150}}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          <Pressable onPress={()=>{navigation.navigate('HelloWorld')}} style={styles.boxstyle}>
            <Text style={styles.boxtext}>Your Orders</Text>
          </Pressable>
          <View style={styles.boxstyle}>
            <Text style={styles.boxtext}>Buy Again</Text>
          </View>
          <View style={styles.boxstyle}>
            <Text style={styles.boxtext}>Your Account</Text>
          </View>
          <View style={styles.boxstyle}>
            <Text style={styles.boxtext}>Your Lists</Text>
          </View>
        </ScrollView>
      </LinearGradient>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
            Your Orders
          </Text>
          <Text style={{color: 'blue'}}>See all</Text>
        </View>
      </View>
      <ScrollView horizontal={true} style={{marginTop: 10}}>
        {orderData.map(item => (
          <View
          key={item._id}
            style={{
              height: 130,
              width: 170,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#d6d4c9',
              marginHorizontal: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: item.products[0].mainImg.image}}
              style={{height: 100, width: 100,resizeMode:'contain'}}
            />
          </View>
        ))}
        <View
          style={{
            height: 130,
            width: 170,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#d6d4c9',
            marginHorizontal: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Can't find the order?</Text>
        </View>
      </ScrollView>
      <View style={{marginTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
            Your Lists
          </Text>
          <Text style={{color: 'blue'}}>See all</Text>
        </View>
      </View>
      <View>
        <View
          style={{
            borderWidth: 1,
            width: '90%',
            height: 120,
            alignSelf: 'center',
            borderRadius: 10,
            borderColor: '#d6d4c9',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            <Text>Shopping List</Text>
            <Text>Private default</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            {orderData1.map(item => (
              <>
                <Image
                key={item.id}
                  source={{uri: item.image}}
                  style={{height: 100, width: 80, resizeMode: 'contain'}}
                />
                
              </>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};
export default ProfilePage;
const styles = StyleSheet.create({
  boxstyle: {
    height: 50,
    width: 160,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#d6d4c9',
    margin: 10,
  },
  boxtext: {
    fontWeight: 'bold',
    color: 'black',
  },
});
