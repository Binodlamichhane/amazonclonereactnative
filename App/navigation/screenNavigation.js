import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomePage from '../screen/HomePage.js';
import AnimatedPage from '../screen/AnimatedPage.js';
import ProfilePage from '../screen/ProfilePage.js';
import LoginPage from '../screen/LoginPage.js';
import RegisterPage from '../screen/RegisterPage.js';
import SplashScreen from '../screen/SplashScreen.js';
import ForgetPasswordPage from '../screen/ForgetPasswordPage.js';
import OtpVerificationPage from '../screen/OptVerificationPage.js';
import ProductDetailsPage from '../screen/ProductDetailsPage.js';
import MenuPage from '../screen/MenuPage.js';
import MorePage from '../screen/MorePage.js';
import AddressPage from '../screen/AddressPage.js';
import AddressForm from '../screen/AddressForm.js';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import CartPage from '../screen/CartPage.js';
import {UseSelector, useSelector} from 'react-redux';
import SearchPage from '../screen/SearchPage.js';
import OrderPage from '../screen/OrderPage.js';
import DeliveryPage from '../screen/DeliveryPage.js';
import PaymentPage from '../screen/PaymentPage.js';
import PlaceOrderPage from '../screen/PlaceOrderPage.js';
import SuccessPage from '../screen/SuccessPage.js';
import HelloWorld from '../screen/Astac.js';
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
function Details() {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ProductDetailsPage" component={ProductDetailsPage} />
    </Stack.Navigator>
  );
}
function BottomTab() {
  const cartCounter = useSelector(state => state.cart.length);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#218e91"
      barStyle={{backgroundColor: 'white'}}>
      <Tab.Screen
        name="Home"
        component={Details}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="home-account"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="You"
        component={ProfilePage}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="more"
        component={MorePage}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="layers-outline"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartPage}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="cart-outline"
              color={color}
              size={25}
            />
          ),
          tabBarBadge: cartCounter,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuPage}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="menu" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* <Stack.Screen name="HomePage" component={HomePage} options={{headerShown:false}}/>
                <Stack.Screen name='ProductDetailsPage' component={ProductDetailsPage} options={{headerShown:false}}/> */}
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="AnimatedPage" component={AnimatedPage} />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPasswordPage"
          component={ForgetPasswordPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpVerificationPage"
          component={OtpVerificationPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddressPage"
          component={AddressPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchPage"
          component={SearchPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddressForm"
          component={AddressForm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderPage"
          component={OrderPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DeliveryPage"
          component={DeliveryPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentPage"
          component={PaymentPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PlaceOrderPage"
          component={PlaceOrderPage}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="SuccessPage"
          component={SuccessPage}
          options={{headerShown: false}}
        />
           <Stack.Screen
          name="HelloWorld"
          component={HelloWorld}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
