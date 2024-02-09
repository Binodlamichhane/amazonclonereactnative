import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  StatusBar,
  ScrollView,
  Pressable,
  useWindowDimensions,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Rating} from 'react-native-ratings';
import {getData} from '../utils/AsyncStorage';
import {useNavigation} from '@react-navigation/native';
import ModalView from '../utils/ModalView';
import url from '../utils/Constant.js';
import {AddToCart} from '../Redux/cartslice';
import {useDispatch, useSelector} from 'react-redux';
export default function HomePage() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const address1 = useSelector(state => state.address);
  const getCategoires = async () => {
    const response = await axios.get(`${url}/api/product/categories`);
    console.log(response.data.data);
    setCategories(response.data.data);
  };
  const getProduct = async () => {
    const token = await getData('token');
    const response = await axios.get(`${url}/api/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProduct(response.data.data);
    console.log(response.data.data);
  };
  useEffect(() => {
    const backhand = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert('exist app', 'are you sure you want to leave app', [
        {
          text: 'ok',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
        {
          text: 'cancel',
          onPress: () => {
            null;
          },
        },
      ]);
      return true;
    });
    getCategoires();
    getProduct();
    // const unsubscribe = navigation.addListener('blur', () => {
    //   console.log('revoewe');
    // });
    // return unsubscribe;
    return()=>backhand.remove();
  },[]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'#77a69e'} />
      <View style={{height: 55, backgroundColor: '#77a69e'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderRadius: 10,
            margin: 5,
            backgroundColor: 'white',
            paddingHorizontal: 5,
          }}>
          <Image
            source={require('../assets/image/searchicon/search_icon.png')}
          />
          <Pressable
            onPress={() => {
              navigation.navigate('SearchPage');
            }}>
            <TextInput
              style={{width: width / 1.3, color: 'black'}}
              placeholder="Search Amazon.in"
              editable={false}
            />
          </Pressable>
          <Image
            source={require('../assets/image/microphone/microphone.png')}
            style={{height: 20, width: 20}}
          />
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            backgroundColor: '#c5ebe4',
          }}>
          <Pressable
            onPress={() => {
              setIsVisible(!isVisible);
            }}
            style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
            <Image
              source={require('../assets/image/location/location.png')}
              style={{height: 20, width: 20}}
            />
            <Text style={{color: 'black', fontSize: 13}}>
              {' '}
              {`Deliver to Binod Noida`}
            </Text>
            <Image
              source={require('../assets/image/downarrow/down-arrow.png')}
              style={{height: 20, width: 20}}
            />
          </Pressable>
        </View>

        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{height: 100}}>
            {/* <View style={{flexDirection:'row',height:130, borderWidth:1}}> */}
            {categories.map(data => (
              <View
                key={data._id}
                style={{
                  height: 90,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 4,
                }}>
                <Image
                  source={{uri: data.image}}
                  style={{height: 60, width: 70, resizeMode: 'contain'}}
                />
                <Text style={{alignSelf: 'center'}}>{data.name}</Text>
              </View>
            ))}
            {/* </View> */}
          </ScrollView>
        </View>
        <View>
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: width,
              padding: 5,
            }}>
            {product.map(items => (
              <View key={items._id}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('ProductDetailsPage', {
                      items: items,
                    });
                  }}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 270,
                    width: width / 2.2,
          
                    margin: 5,
                    borderRadius: 10,
                    padding: 3,
                    backgroundColor:'#f9faf7',
                  }}>
                  <Text>{items.category}</Text>
                  <Image
                    source={{uri: items.mainImg.image}}
                    style={{
                      height: 150,
                      width: 150,
                      resizeMode: 'contain',
                      margin: 0,
                    }}
                    onLoad={() => {
                      console.log('image loaded successfully');
                    }}
                    onError={error =>
                      console.error('Error loading image', error)
                    }
                  />
                  <Text numberOfLines={2}>{items.name}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: 150,
                      height: 25,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginRight: 7,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Rating
                        type="star"
                        ratingCount={5}
                        RatingColor="#f1c40f"
                        imageSize={15}
                        readonly
                        startingValue={items.averageRating}
                        backgroundColor="#00000000"
                      />
                    </View>
                    <Text style={{alignSelf: 'center'}}>
                      {items.averageRating}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => {
                      dispatch(AddToCart(items));
                    }}
                    android_ripple={{color: 'red'}}
                    style={{
                      backgroundColor: '#e0da19',
                      width: 130,
                      borderRadius: 15,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text>Add to Cart</Text>
                  </Pressable>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
        {isVisible ? (
          <ModalView setIsVisible={setIsVisible} isVisible={isVisible} />
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});

{
  /* <View style={{flexDirection:'row', width:'100%',bor}}> 
<Image source={require('../assets/image/searchicon/search_icon.png')} />
<TextInput style={{borderWidth:1}} />
<Image source={require('../assets/image/microphone/microphone.png')} style={{height:25,width:25}} />
</View> */
}

// import React,{useEffect, useState} from 'react';
// import {View,Text,useWindowDimensions,SafeAreaView, StyleSheet,Platform,StatusBar, TextInput, Image, Pressable,BackHandler,Alert, FlatList, ScrollView, SectionList} from 'react-native';
// import axios from 'axios';
// import { getData } from '../utils/AsyncStorage';
// const HomePage=({navigation})=>{
//   const[search,setSearch]=useState('')
//   const[sectiondata,setSectionData]=useState([]);
//   const[categories,setCategories]=useState([]);
//   const[product,setProduct]=useState([]);
//   const {height, width} = useWindowDimensions();
//   const handleSearch=(e)=>{
//     setSearch(e);
//   }
//   const handlelogopress=()=>{
//     navigation.navigate('ProfilePage');
//   }
//   const allCategories=async()=>{
//     const token =await getData('token');
//     const response1=await axios.get('https://146.190.129.101/api/product/categories')
//     setCategories(response1.data.data);
//     const response2=await axios.get('http://146.190.129.101/api/product',{headers:{
//       "Authorization":`Bearer ${token}`
//     }});
//     setProduct(response2.data.data);
//     const sectiondata1=[{
//       title:'categories',
//       data:[response1.data.data]
//      },
//      {
//       title:'products',
//       data:[response2.data.data]
//      }]
//      setSectionData(sectiondata1);

//   }

//   useEffect(()=>{
//     const backhand=BackHandler.addEventListener('hardwareBackPress',()=>{
//       Alert.alert('exit App','are you sure you want to exit app',[{text:'ok', onPress:()=>{
//         BackHandler.exitApp()}

//       },{text:'cancel', onPress:()=>{null}}])
//       return true;
//     })
//     allCategories();

//     return()=>backhand.remove();

//   },[])
//   return(
//     <SafeAreaView style={styles.safeview}>
//       <View style={styles.searchbarview}>
//         <Pressable onPress={handlelogopress}>
//             <Image source={require('../assets/image/logo/Ecom_logo.png')} style={{height:45,width:40}}/>
//         </Pressable>
//         <TextInput value={search} onChangeText={handleSearch} style={styles.searchbar} placeholder='Search'/>
//         <Image source={require('../assets/image/searchicon/search_icon.png')} />
//       </View>
//       <ScrollView style={{}} showsVerticalScrollIndicator={false}>
//         <FlatList
//         data={categories}
//         renderItem={({item})=>(
//           <View style={{borderWidth:2,margin:5,borderRadius:8}}>
//             <Image source={{uri:item.profileImg}} style={{width:width/4,height:height/7}}/>
//             <View style={{borderTopWidth:2}} >
//             <Text style={{alignSelf:'center',fontSize:20,color:'black'}}>{item.name}</Text>
//             </View>

//           </View>
//           )}
//         keyExtractor={(item)=>item._id}
//         horizontal={true}
//         showsHorizontalScrollIndicator={false}
//         />
//         <FlatList
//           data={product}
//           renderItem={({item})=>(<View style={{borderWidth:1,width:width/2.1,borderRadius:7,margin:3}}>
//             <View style={{padding:4}}>
//             <Image source={{uri:item.productImg}} style={{width:width/2.2,height:height/3.3,alignSelf:'center'}}/>
//             </View>
//            <View style={{borderTopWidth:1,color:'black',padding:3}}>
//            <Text>{item.name}</Text>
//             </View>

//             </View>)}
//           keyExtractor={(item)=>item._id}
//           numColumns={2}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   )
// }
// const styles=StyleSheet.create({
//   safeview:{
//     borderWidth:2,
//     flex:1,
//   },
//   searchbarview:{
//     flexDirection:'row',
//     justifyContent:'space-around',
//     alignItems:'center',
//     paddingRight:5
//   },
//   searchbar:{
//     width:"70%",
//     height:35,
//     alignSelf:'center',
//     borderWidth:2,
//     borderRadius:7
//   },

// })
// export default HomePage;

{
  /* <FlatList
data={categories}
renderItem={({item})=>(
  <View style={{borderWidth:2,margin:5,borderRadius:8}}>
    <Image source={{uri:item.profileImg}} style={{width:width/4,height:height/7}}/>
    <View style={{borderTopWidth:2}} >
    <Text style={{alignSelf:'center',fontSize:20,color:'black'}}>{item.name}</Text>
    </View>
    
  </View>
  )}
keyExtractor={(item)=>item._id}
horizontal={true}
showsHorizontalScrollIndicator={false}
/> */
}
{
  /* <SectionList
sections={sectiondata}
keyExtractor={(item,index)=>index}
renderItem={({item})=>{

}}
/> */
}
