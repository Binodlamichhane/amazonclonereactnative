import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import {useState} from 'react';
import {Rating} from 'react-native-ratings';
import {useRoute} from '@react-navigation/native';
import {useDispatch,useSelector} from 'react-redux';
import { AddToCart } from '../Redux/cartslice';
const ProductDetailsPage = ({props}) => {
  const {height, width} = useWindowDimensions();
  const [wish, setWish] = useState(false);
  const route = useRoute();
  const cartcount=useSelector((state)=>state.cart.length)
  const dispatch=useDispatch();
  const {
    _id,
    mainImg,
    name,
    description,
    category,
    stock,
    price,
    status,
    coverImg,
    review,
    averageRating,
    user_id,
  } = route.params.items;
  console.log('cart data',cartcount);
  console.log('product page', route.params.items.coverImg[0].image);
  return (
    <ScrollView style={{backgroundColor:'white'}}>
      <ScrollView
        style={{ position: 'relative'}}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {coverImg.map(items => (
          <ImageBackground
            key={items._id}
            source={{uri: items.image}}
            resizeMode="contain"
            style={{width: width, height: 360}}></ImageBackground>
        ))}
      </ScrollView>
      <View
        style={{
          width: 40,
          height: 40,
          borderWidth: 1,
          borderRadius: 20,
          padding: 3,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 20,
          left: 20,
          backgroundColor: '#cf294a',
        }}>
        <Text>20%off</Text>
      </View>
      <View
        style={{
          width: 40,
          height: 40,
          borderWidth: 1,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 20,
          right: 20,
        }}>
        <Image
          style={{width: 25, height: 25}}
          source={require('../assets/image/share/share.png')}
        />
      </View>
      <Pressable
        onPress={() => {
          setWish(!wish);
        }}
        style={{
          width: 40,
          height: 40,
          borderWidth: 1,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 310,
          left: 20,
        }}>
        {wish ? (
          <Image
            style={{width: 25, height: 25}}
            source={require('../assets/image/heart/redheart.png')}
          />
        ) : (
          <Image
            style={{width: 25, height: 25}}
            source={require('../assets/image/heart/heart.png')}
          />
        )}
      </Pressable>

      <View>
        <View
          style={{
            flexDirection: 'row',
            height: 25,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{marginLeft: 10, color: '#218e91'}}>
              visit infinity store
            </Text>
          </View>
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
              startingValue={averageRating}
              backgroundColor="#00000000"
            />
            <Text style={{alignSelf: 'center', marginRight: 10}}>
              {review.length}
            </Text>
            <Text>Rating</Text>
          </View>
        </View>

        <Text style={{marginLeft: 10}}>{name}</Text>
        <View
          style={{
            backgroundColor: '#cf294a',
            borderRadius: 5,
            marginLeft: 10,
            width: 100,
            height: 20,
          }}>
          <Text>Deal of the Day</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 10,
              color: 'red',
              marginRight: 5,
            }}>
            -40%
          </Text>
          <Text style={{fontSize: 22, fontWeight: '500'}}> ₹{price}</Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            marginLeft: 10,
            textDecorationLine: 'line-through',
            paddingBottom: 10,
          }}>
          mrp:{price+40/100*price}
        </Text>
        <View style={{borderTopWidth: 1}}>
          <Text
            style={{
              fontSize: 19,
              color: '#272a2e',
              fontWeight: 500,
              marginLeft: 10,
            }}>
            Total: ₹{price}
          </Text>
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={{color: '#218e91', marginTop: 20}}>
            FREE DELIVERY{' '}
            <Text style={{color: '#3f4245'}}>{new Date().toDateString()}.</Text>
            <Text style={{color: '#218e91'}}> Details</Text>
          </Text>
          <Text style={{marginRight: 30}}>
            {' '}
            Or fastest delivery{' '}
            <Text style={{fontWeight: 'bold'}}>Tomorrow 6AM - 11AM.</Text>Order
            within <Text style={{color:'#4e8a5b'}}>5 hrs 40 mins.</Text><Text style={{color:'#218e91'}}>Details</Text>{' '}
          </Text>
        </View>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            marginLeft:10
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/image/location/location.png')}
              style={{height: 20, width: 20}}
            />
            <Text style={{color: '#218e91', fontSize: 13}}>
              {' '}
              Deliver to Binod-Noida 201301
            </Text>
            <Image
              source={require('../assets/image/downarrow/down-arrow.png')}
              style={{height: 20, width: 20}}
            />
          </View>
        </View>
        <Pressable
        onPress={()=>{dispatch(AddToCart(route.params.items))}}
        android_ripple={{color:'red'}}
          style={{
            height: 40,
            alignItems: 'center',
            justifyContent: 'center', 
            marginHorizontal: 20,
            marginBottom: 5,
            marginTop: 20,
            borderRadius: 20,
            backgroundColor: '#d9ca2e',
          }}>
          <Text>Add to Cart</Text>
        </Pressable>
        <View
          style={{
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 20,
            marginVertical: 5,
            borderRadius: 20,
            backgroundColor: '#e8c31e',
          }}>
          <Text>Buy Now</Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default ProductDetailsPage;
