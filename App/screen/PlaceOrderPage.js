import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Pressable,
    useWindowDimensions,
  } from 'react-native';
  import React from 'react';
  import LinearGradient from 'react-native-linear-gradient';
  import {useNavigation} from '@react-navigation/native';
  import Roundshadow from '../components/Roundshadow';
  
  const PlaceOrderPage = () => {
    const navigation = useNavigation();
    const {height, width} = useWindowDimensions();
    return (
      <View>
        <LinearGradient
          start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 0.0}}
          colors={['#77a69e', '#c5ebe4']}>
          <StatusBar />
          <Pressable
            onPress={() => {
              navigation.navigate('CartPage');
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
        <View style={{flexDirection: 'row',marginTop:5}}>
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
                position:'relative',
                justifyContent:'center',
                alignItems:'center'
              }}>
                <Roundshadow/>
              </View>
              <View style={{width:60,borderWidth:1,height:1,position:'absolute',left:65,top:10}}></View>
            <Text>Address</Text>
          </View>
          
  
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
                justifyContent:'center',
                alignItems:'center'
              }}>
                 <Roundshadow/>
              </View>
              <View style={{width:60,borderWidth:1,height:1,position:'absolute',left:65,top:10}}></View>
            <Text>Delivery</Text>
          </View>
  
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
                justifyContent:'center',
                alignItems:'center'
              }}>
                <Roundshadow/>
              </View>
              <View style={{width:60,borderWidth:1,height:1,position:'absolute',left:65,top:10}}></View>
            <Text>Payment</Text>
          </View>
  
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
                justifyContent:'center',
                alignItems:'center'
              }}>
                 <Roundshadow/>
              </View>
            <Text>Place order</Text>
          </View>
        </View>
      </View>
    );
  };
  
  export default PlaceOrderPage;
  
  const styles = StyleSheet.create({
    positionStyle:{
        borderWidth: 1,
        height: 20,
        width: 20,
        borderRadius: 10,
      },
      tapPositionStyle:{
        borderWidth: 1,
        height: 20,
        width: 20,
        borderRadius: 10,
        position:'relative',
        alignItems:'center',
        justifyContent:'center'
      }
    });