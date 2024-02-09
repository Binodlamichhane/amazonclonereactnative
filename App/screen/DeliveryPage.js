import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Pressable,
    useWindowDimensions,
  } from 'react-native';
  import React,{useState} from 'react';
  import LinearGradient from 'react-native-linear-gradient';
  import {useNavigation} from '@react-navigation/native';
import Roundshadow from '../components/Roundshadow.js';

  
  const DeliveryPage = () => {
    const [select, setSelect] = useState(1);
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
        <Pressable
          onPress={()=>{navigation.navigate('OrderPage')}}
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
            <Text>
                Address
            </Text>
          </Pressable>
          
  
          <Pressable
          onPress={()=>{navigation.navigate('DeliveryPage')}}
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
              }}></View>
            <Text>Place order</Text>
          </View>
        </View>
        <View>
        <Text>
            Choose your Delivery Options
        </Text>
        <View style={{flexDirection:'row',borderWidth:1,margin:10,backgroundColor:'white',padding:8}}>
        <View style={{justifyContent: 'center',marginRight:5}}>
              <Pressable
                onPress={() => setSelect(!select)}
                style={[styles.tapPositionStyle]}>
                {select  ? <Roundshadow /> : null}
              </Pressable>
            </View>
            <Text style={{color:'blue'}}>Tomorrow by 10 pm -<Text style={{color:'black'}}>Free delivery with your Prime membership</Text></Text>
            </View>
            <Pressable
                onPress={() => {
                  navigation.navigate('PaymentPage');
                }}
                style={{
                  height: 45,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                  borderRadius: 15,
                  backgroundColor: '#e8c31e',
                  marginHorizontal:10
                }}>
                <Text style={{color: 'black', fontSize: 15}}>
                  set this address
                </Text>
              </Pressable>
        </View>
      </View>
    );
  };
  
  export default DeliveryPage;
  
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
  