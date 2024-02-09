import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Roundshadow from '../components/Roundshadow.js';

const PaymentPage = () => {
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();
  const [select, setSelect] = useState(0);
  return (
    <View>
      <LinearGradient
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 0.0}}
        colors={['#77a69e', '#c5ebe4']}>
        <StatusBar />
        <Pressable
          onPress={() => {
            navigation.navigate('PlaceOrderPage');
          }}
          style={{
            height: 70,
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginRight: 10,
          }}>
          <Text>CANCEL</Text>
        </Pressable>
      </LinearGradient>
      <View style={{flexDirection: 'row', marginTop: 5}}>
        <Pressable
          onPress={() => {
            navigation.navigate('OrderPage');
          }}
          style={{
            justifyContent: 'center',
            width: width / 4,
            alignItems: 'center',
          }}>
          <View
            style={{
              borderWidth: 1,
              height: 20,
              width: 20,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Roundshadow />
          </View>
          <View
            style={{
              width: 60,
              borderWidth: 1,
              height: 1,
              position: 'absolute',
              left: 65,
              top: 10,
            }}></View>
          <Text>Address</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate('DeliveryPage');
          }}
          style={{
            justifyContent: 'center',
            width: width / 4,
            alignItems: 'center',
          }}>
          <View
            style={{
              borderWidth: 1,
              height: 20,
              width: 20,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Roundshadow />
          </View>
          <View
            style={{
              width: 60,
              borderWidth: 1,
              height: 1,
              position: 'absolute',
              left: 65,
              top: 10,
            }}></View>
          <Text>Delivery</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate('PaymenyPage');
          }}
          style={{
            justifyContent: 'center',
            width: width / 4,
            alignItems: 'center',
          }}>
          <View
            style={{
              borderWidth: 1,
              height: 20,
              width: 20,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Roundshadow />
          </View>
          <View
            style={{
              width: 60,
              borderWidth: 1,
              height: 1,
              position: 'absolute',
              left: 65,
              top: 10,
            }}></View>
          <Text>Payment</Text>
        </Pressable>

        <View
          style={{
            justifyContent: 'center',
            width: width / 4,
            alignItems: 'center',
          }}>
          <View
            style={{
              borderWidth: 1,
              height: 20,
              width: 20,
              borderRadius: 10,
            }}></View>
          <Text>Place order</Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 15,
            margin: 10,
          }}>
          Choose you Payment Options
        </Text>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            margin: 10,
            backgroundColor: 'white',
            padding: 8,
          }}>
          <View style={{justifyContent: 'center', marginRight: 5}}>
            <Pressable
              onPress={() => setSelect(1)}
              style={[styles.tapPositionStyle]}>
              {select == 1 ? <Roundshadow /> : null}
            </Pressable>
          </View>
          <Text style={{color: 'black'}}>
            Free delivery with your Prime membership
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            margin: 10,
            backgroundColor: 'white',
            padding: 8,
          }}>
          <View style={{justifyContent: 'center', marginRight: 5}}>
            <Pressable
              onPress={() => setSelect(2)}
              style={[styles.tapPositionStyle]}>
              {select == 2 ? <Roundshadow /> : null}
            </Pressable>
          </View>
          <Text style={{color: 'black'}}>UPI/Credit or Debit card</Text>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('PlaceOrderPage');
          }}
          style={{
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
            borderRadius: 15,
            backgroundColor: '#e8c31e',
            marginHorizontal: 10,
          }}>
          <Text style={{color: 'black', fontSize: 15}}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PaymentPage;

const styles = StyleSheet.create({
  positionStyle: {
    borderWidth: 1,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  tapPositionStyle: {
    borderWidth: 1,
    height: 20,
    width: 20,
    borderRadius: 10,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
