import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import DeliveryPage from './DeliveryPage';
import Roundshadow from '../components/Roundshadow.js';
import axios from 'axios';
import {getData} from '../utils/AsyncStorage';
import {RemoveFromCart} from '../Redux/cartslice';

import url from '../utils/Constant.js';

const OrderPage = () => {
  const Pageheader = [
    {id: 0, name: 'Address'},
    {id: 1, name: 'Delivery'},
    {id: 2, name: 'Payment'},
    {id: 3, name: 'PlaceOrder'},
  ];
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [select, setSelect] = useState(0);
  const[select2,setSelect2]=useState(1);
  const [select3,setSelect3]=useState(1);
  const [marked, setMarked] = useState(0);
  const [passed, setPassed] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState({});
  const products = useSelector(state => state.cart);

  const dispatch = useDispatch();
  let [orderData, setOrderData] = useState({
    shippingAddress: '',
    products: [],
    userId: '',
    totalPrice: '',
    orderStatus: '',
    orderDate: '',
    paymentMethod: '',
  });

  const handleAddressPressed = async () => {
    var userId = await getData('userId');
    var productIdArray = [];
    var totalPrice = 0;
    for (let x of products) {
      productIdArray.push(x._id);
      totalPrice = totalPrice + x.price;
    }
    console.log('orderDAFAa', productIdArray);
    setOrderData({...orderData, userId, products: productIdArray, totalPrice});
  };
  const handlePlaceOrder = async () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_1DP5mmOlF5G5ag',
      amount: `${orderData.totalPrice*100}`,
      external: {
        wallets: ['paytm'],
      },
      name: 'Binod',
      prefill: {
        email: 'lamichhanebinod145@gmail.com',
        contact: '9050423437',
        name: 'Binod lamichhane',
      },
      theme: {color: '#F37254'},
    };

    const razorres=await RazorpayCheckout.open(options);
    console.log('razorres',razorres);
    for(let x of products){
      dispatch(RemoveFromCart(x));
    }
   console.log('orderData',orderData);
    const response = await axios.post(`${url}/api/order/`, orderData);
    if(response.data.status == 'success'){
      navigation.navigate('SuccessPage');
    }

  };

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
    <View>
      <LinearGradient
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 0.0}}
        colors={['#77a69e', '#c5ebe4']}>
        <StatusBar />
        <View
          style={{
            height: 70,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: 10,
          }}>
          <Pressable
            onPress={() => {
              if (marked > 0) setMarked(marked - 1);
              if (passed > 0) setPassed(passed - 1);
            }}
            style={{height: 25, width: 40, alignItems: 'center'}}>
          {marked !=0 ?<Image
            source={require('../assets/image/backicon/back-icon.png')}
            style={{height: 20, width: 20}}
          />:null}
          </Pressable>
          <Pressable
            style={{width: 60, height: 30, justifyContent: 'center'}}
            onPress={() => {
              navigation.navigate('BottomTab');
            }}>
            <Text style={{fontSize: 14}}>CANCEL</Text>
          </Pressable>
        </View>
      </LinearGradient>
      <View style={{flexDirection: 'row', marginTop: 5}}>
        {Pageheader.map((item, index) => (
          <View
            onPress={() => {
              setPassed(index);
              setMarked(index);
            }}
            style={{
              justifyContent: 'center',
              width: width / 4,
              alignItems: 'center',
            }}>
            <View
              style={[
                styles.tapPositionStyle,
                {borderColor: `${index > marked ? '#abb3ac' : 'green'}`},
              ]}>
              {index == marked ? (
                <Roundshadow />
              ) : index < passed ? (
                <Text style={{fontSize: 10, color: 'green'}}>✔</Text>
              ) : (
                <Text></Text>
              )}
            </View>
            {index < 3 ? (
              <View
                style={{
                  width: width / 6,
                  borderTopWidth: 2,
                  borderColor: `${index < marked ? '#77a69e' : '#abb3ac'}`,
                  height: 1,
                  position: 'absolute',
                  left: 60,
                  top: 10,
                }}></View>
            ) : null}
            <Text>{item.name}</Text>
          </View>
        ))}

        {/* <View
          style={{
            justifyContent: 'center',
            width: width / 4,
            alignItems: 'center',
          }}>
          <View style={styles.positionStyle}></View>
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
        </View> */}

        {/* <View
          style={{
            justifyContent: 'center',
            width: width / 4,
            alignItems: 'center',
          }}>
          <View style={styles.positionStyle}></View>
          <Text>Place order</Text>
        </View> */}
      </View>
      {marked == 0
        ? address.map((item, index) => (
            <View
              key={item._id}
              style={{
                position: 'relative',
                flexDirection: 'row',
                borderWidth: 1,
                margin: 10,
                borderRadius: 10,
                padding: 10,
              }}>
              {/* <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
        Personal Address
      </Text> */}
              <View style={{justifyContent: 'center'}}>
                <Pressable
                  onPress={() => {
                    setSelect(index);
                  }}
                  style={[styles.tapPositionStyle]}>
                  {select == index ? <Roundshadow /> : null}
                </Pressable>
              </View>
              <View
                style={{
                  // borderWidth: 1,
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
                    {select == index ? (
                      <Pressable
                        onPress={async () => {
                          setMarked(1), setPassed(1);
                          setSelectedAddress({address: item});
                          await handleAddressPressed();
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
                          Deliver to this address
                        </Text>
                      </Pressable>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          ))
        : null}
      {marked == 1 ? (
        <View style={{marginTop: 10}}>
          <Text style={{margin: 10, fontSize: 15, fontWeight: 'bold'}}>
            Choose your Delivery Options
          </Text>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              margin: 10,
              backgroundColor: 'white',
              padding: 8,
              borderRadius: 7,
              width: '92%',
              alignSelf: 'center',
            }}>
            <View style={{justifyContent: 'center', marginRight: 5}}>
              <Pressable
                onPress={() => {
                  setSelect2(!select2);
                }}
                style={[styles.tapPositionStyle]}>
                {select2 ? <Roundshadow /> : null}
              </Pressable>
            </View>
            <View>
              <Text style={{color: 'blue'}}>
                Tomorrow by 10 pm -
                <Text style={{color: 'black'}} numberOfLines={2}>
                  Free delivery with your Prime membership
                </Text>
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => {
              setMarked(2), setPassed(2);
              const finaladdress = selectedAddress.address._id;
              setOrderData({...orderData, shippingAddress: finaladdress});
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
            <Text style={{color: 'black', fontSize: 15}}>set this address</Text>
          </Pressable>
        </View>
      ) : null}
      {marked == 2 ? (
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
                onPress={() => {
                  setSelect3(1);
                }}
                style={[styles.tapPositionStyle]}>
                {select3 == 1 ? <Roundshadow /> : null}
              </Pressable>
            </View>
            <Text style={{color: 'black'}}>cash on Delivery</Text>
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
                onPress={() => setSelect3(2)}
                style={[styles.tapPositionStyle]}>
                {select3 == 2 ? <Roundshadow /> : null}
              </Pressable>
            </View>
            <Text style={{color: 'black'}}>UPI/Credit or Debit card</Text>
          </View>
          <Pressable
            onPress={() => {
              if (select3 == 1) {
                setMarked(3), setPassed(3);
                setOrderData({
                  ...orderData,
                  paymentMethod: 'cash on delivery',
                  orderStatus: 'pending',
                  orderDate: Date.now(),
                });
              }
                else{
                  setMarked(3), setPassed(3);
                  setOrderData({
                    ...orderData,
                    paymentMethod: 'upi_payment',
                    orderStatus: 'pending',
                    orderDate: Date.now(),
                  });
                }
           
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
      ) : null}
      {marked == 3 ? (
        <View>
          <Text style={{fontSize: 18, fontWeight: 'bold', margin: 10}}>
            Order now
          </Text>
          <View
            style={{margin: 10, borderWidth: 1, padding: 10, borderRadius: 10}}>
            <View style={{paddingVertical: 10, borderBottomWidth: 1}}>
              <Text style={{fontSize: 15, fontWeight: 500}}>
                Shipping to:{selectedAddress.address.fullname},
                {selectedAddress.address.houseNo},{selectedAddress.address.city}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Items:</Text>
              <Text>₹{orderData.totalPrice}</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Delivery</Text>
              <Text>₹80</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Total:</Text>
              <Text>₹800</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Promotion Applied:</Text>
              <Text>₹70</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontWeight: 'bold'}}>Order Total:</Text>
              <Text>₹{orderData.totalPrice}</Text>
            </View>
          </View>
          <Pressable
            onPress={() => {
              setMarked(3), setPassed(3);
              // console.log('tanuj', orderData);
              if(orderData.paymentMethod=='upi_payment'){
                handlePlaceOrder();
              }else{
               
              }
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
            <Text style={{color: 'black', fontSize: 15}}>Place Order</Text>
          </Pressable>
        </View>
      ) : null}

      <View></View>
    </View>
  );
};

export default OrderPage;

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
    backgroundColor: 'white',
  },
  boxstyle: {
    padding: 8,
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    borderColor: '#d6d4c9',
  },
});

// {address.map((item, index) => (
//     <View
//       key={item._id}
//       style={{
//         position: 'relative',
//         flexDirection: 'row',
//         borderWidth: 1,
//         margin: 10,
//         borderRadius: 10,
//         padding: 10,
//       }}>
//       {/* <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
//         Personal Address
//       </Text> */}
//       <View style={{justifyContent: 'center'}}>
//         <Pressable
//           onPress={() => setSelect(index)}
//           style={[styles.tapPositionStyle]}>
//           {select == index ? <Roundshadow /> : null}
//         </Pressable>
//       </View>
//       <View
//         style={{
//           // borderWidth: 1,
//           margin: 5,
//           borderRadius: 10,
//           borderColor: '#d6d4c9',
//           borderColor: '#d6d4c9',
//         }}>
//         <View style={{margin: 10}}>
//           <View
//             style={{
//               flexDirection: 'row',
//               borderBottomWidth: 1,
//               borderColor: '#d6d4c9',
//               height: 30,
//             }}>
//             <Text>{item.addressType}:</Text>
//             <Image
//               source={require('../assets/image/amazonlogo/amazonlogo.png')}
//               style={{height: 25, width: 40}}
//             />
//           </View>
//           <View>
//             <Text style={{fontWeight: 'bold', color: 'black'}}>
//               {item.fullname}
//             </Text>
//             <Text style={{color: 'black'}}>{item.houseNo}</Text>
//             <Text style={{color: 'black'}}>
//               {item.city},{item.state},{item.postalCode}
//             </Text>
//             <Text style={{color: 'black'}}>India</Text>
//             <Text style={{color: 'black'}}>
//               Phone number:{item.mobileNo}
//             </Text>
//             <View style={{flexDirection: 'row', marginTop: 8}}>
//               <Image
//                 source={require('../assets/image/locationpointer/locationpointer.png')}
//                 style={{
//                   height: 18,
//                   width: 20,
//                   resizeMode: 'contain',
//                   marginRight: 2,
//                 }}
//               />
//               <Text style={{color: '#3a9c95'}}>
//                 Update delivery location
//               </Text>
//             </View>
//             <View style={{flexDirection: 'row', marginTop: 3}}>
//               <Text style={styles.boxstyle}>Edit</Text>
//               <Text style={styles.boxstyle}>Remove</Text>
//             </View>
//             {select == index ? (
//         <Pressable
//           onPress={() => {
//             navigation.navigate('DeliveryPage',{item});
//           }}
//           style={{
//             height: 45,
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginVertical: 10,
//             borderRadius: 15,
//             backgroundColor: '#e8c31e',
//           }}>
//           <Text style={{color: 'black', fontSize: 15}}>
//             Deliver to this address
//           </Text>
//         </Pressable>
//       ) : null}
//           </View>
//         </View>
//       </View>
//     </View>
//   ))}

// {index==select?address.map((item, index) => (
//     <View
//       key={item._id}
//       style={{
//         position: 'relative',
//         flexDirection: 'row',
//         borderWidth: 1,
//         margin: 10,
//         borderRadius: 10,
//         padding: 10,
//       }}>
//       {/* <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
//         Personal Address
//       </Text> */}
//       <View style={{justifyContent: 'center'}}>
//         <Pressable
//           onPress={() => setSelect(index)}
//           style={[styles.tapPositionStyle]}>
//           {select == index ? <Roundshadow /> : null}
//         </Pressable>
//       </View>
//       <View
//         style={{
//           // borderWidth: 1,
//           margin: 5,
//           borderRadius: 10,
//           borderColor: '#d6d4c9',
//           borderColor: '#d6d4c9',
//         }}>
//         <View style={{margin: 10}}>
//           <View
//             style={{
//               flexDirection: 'row',
//               borderBottomWidth: 1,
//               borderColor: '#d6d4c9',
//               height: 30,
//             }}>
//             <Text>{item.addressType}:</Text>
//             <Image
//               source={require('../assets/image/amazonlogo/amazonlogo.png')}
//               style={{height: 25, width: 40}}
//             />
//           </View>
//           <View>
//             <Text style={{fontWeight: 'bold', color: 'black'}}>
//               {item.fullname}
//             </Text>
//             <Text style={{color: 'black'}}>{item.houseNo}</Text>
//             <Text style={{color: 'black'}}>
//               {item.city},{item.state},{item.postalCode}
//             </Text>
//             <Text style={{color: 'black'}}>India</Text>
//             <Text style={{color: 'black'}}>
//               Phone number:{item.mobileNo}
//             </Text>
//             <View style={{flexDirection: 'row', marginTop: 8}}>
//               <Image
//                 source={require('../assets/image/locationpointer/locationpointer.png')}
//                 style={{
//                   height: 18,
//                   width: 20,
//                   resizeMode: 'contain',
//                   marginRight: 2,
//                 }}
//               />
//               <Text style={{color: '#3a9c95'}}>
//                 Update delivery location
//               </Text>
//             </View>
//             <View style={{flexDirection: 'row', marginTop: 3}}>
//               <Text style={styles.boxstyle}>Edit</Text>
//               <Text style={styles.boxstyle}>Remove</Text>
//             </View>
//             {select == index ? (
//         <Pressable
//           onPress={() => {
//             navigation.navigate('DeliveryPage',{item});
//           }}
//           style={{
//             height: 45,
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginVertical: 10,
//             borderRadius: 15,
//             backgroundColor: '#e8c31e',
//           }}>
//           <Text style={{color: 'black', fontSize: 15}}>
//             Deliver to this address
//           </Text>
//         </Pressable>
//       ) : null}
//           </View>
//         </View>
//       </View>
//     </View>
//   )):null}


    // const response1 = axios.post('https://api.razorpay.com/v1/orders', datatosend, {
    //   headers: {
    //     'Authorization': `Basic ${Buffer.from(`${'rzp_test_d8SOd4uROmAnDg'}:${'6VSc3Ulaf06jzpM8LP5C0waC'}`).toString('base64')}`,
    //       // Username: 'rzp_test_d8SOd4uROmAnDg',
    //       // password: '6VSc3Ulaf06jzpM8LP5C0waC',
    //       'Content-Type': 'application/json',

    //   },
    // });