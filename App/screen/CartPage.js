import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {AddToCart, RemoveFromCart} from '../Redux/cartslice';
export default function CartPage() {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const cartData = useSelector(state => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  console.log('data-----', cartData);
  const sum = cartData => {
    let total = 0;
    let count = 0;
    for (let x of cartData) {
      total = total + x.quantity * x.price;
    }
    console.log('total', total);
    console.log('count', count);
    setTotalPrice(total);
  };
  useEffect(() => {

    sum(cartData);
  });
  return (
    <ScrollView style={{marginHorizontal: 10}}>
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <Text style={{fontSize: 22, marginTop: 9, color: 'black'}}>
          Subtotal{' '}
        </Text>
        <Text style={{fontSize: 15, lineHeight: 40, color: 'black'}}>₹</Text>
        <Text
          style={{
            fontSize: 22,
            marginTop: 9,
            color: 'black',
            fontWeight: 'bold',
          }}>
          {totalPrice}
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginRight: 20}}>
        <MaterialCommunityIcons name="check-circle" color="green" size={20} />
        <Text style={{fontWeight: 'bold', color: 'green'}}>
          Your order is eligible for FREE DElivery.
          <Text style={{color: '#3f4245'}}>
            Select this option at checkout.
          </Text>
          <Text style={{color: '#218e91'}}>Details</Text>
        </Text>
      </View>
      <Pressable
         onPress={() => {
          if(cartData.length>=1){
            navigation.navigate('OrderPage');
          }
          else{
            
          }
        
        }}
        style={{
          height: 45,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
          borderRadius: 15,
          backgroundColor: '#e8c31e',
        }}>

       
          <Text style={{color: 'black', fontSize: 15}}>
            Proceed to Buy ({cartData.length}item)
          </Text>
      
      </Pressable>
      <View style={{marginTop: 10,}}>
        {cartData.map(items => (
          <View
            style={{flexDirection: 'row', height:height/3.3,borderRadius:10,backgroundColor:'#f9faf7',marginBottom:10}}
            key={items._id}>
            <View>
              <Image
                source={{uri: items.mainImg.image}}
                style={{height: height/4.2, width: width / 2.7, resizeMode: 'contain'}}
              />
              <View
                style={{
                  borderWidth: 1,
                  height: 36,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderColor:'#d6d4c9'
                }}>
                <Pressable
                  onPress={() => {
                    // if(items.quantity==1){
                    //   dispatch(RemoveFromCart(items));
                    // }
                    dispatch(RemoveFromCart(items));
                  }}>
                  <Text
                    style={{
                      width: width / 2.7 / 3.15,
                      borderRightWidth: 1,
                      textAlign: 'center',
                      alignSelf: 'center',
                      fontSize: 25,
                      fontWeight: 'bold',
                      backgroundColor: '#d5d6d4',
                      borderTopLeftRadius: 10,
                      borderColor:'#d6d4c9',
                      borderBottomLeftRadius: 10,
                    }}>
                    -
                  </Text>
                </Pressable>

                <Text
                  style={{
                    width: width / 2.7 / 2.8,
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontSize: 20,
                  }}>
                  {items.quantity}
                </Text>
                <Pressable
                  onPress={() => {
                    dispatch(AddToCart(items));
                  }}>
                  <Text
                    style={{
                      width: width / 2.7 / 3.15,
                      borderLeftWidth: 1,
                      textAlign: 'center',
                      alignSelf: 'center',
                      fontSize: 25,
                      fontWeight: 'bold',
                      backgroundColor: '#d5d6d4',
                      borderTopRightRadius: 10,
                      borderColor:'#d6d4c9',
                      borderBottomRightRadius: 10,
                    }}>
                    +
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={{width: width / 1.9, margin: 10,justifyContent:'center'}}>
              <Text numberOfLines={2} style={{fontSize: 15}}>
                {items.name} 
    
              </Text>
              <Text style={{fontSize: 12}}>2K + bought in past months</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 6,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 15,
                    backgroundColor: 'red',
                    borderRadius: 7,
                  }}>
                  40% off
                </Text>
                <Text style={{fontSize: 12, color: 'red'}}>
                  {' '}
                  Deal of the Day
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 15, lineHeight: 20, color: 'black'}}>
                  ₹
                </Text>
                <Text
                  style={{
                    fontSize: 22,

                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  {items.price}
                </Text>
              </View>
              <Text style={{fontSize: 13}}>Eligible for free shipping</Text>
              <Text style={{color: 'green'}}>In stock</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
