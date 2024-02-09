import {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {InputButton, PasswordButton} from '../components/Button.js';
import PressableButton from '../components/PressableButton.js';
import {storeData} from '../utils/AsyncStorage.js';
import axios from 'axios';
import url from '../utils/Constant.js'
const LoginPage = ({navigation}) => {
  const [input, setInput] = useState({email: '', password: ''});
  const [eye1, setEye1] = useState(true);

  const handleEye1Button = () => {
    setEye1(!eye1);
  };
  const handleLogin = async () => {
    console.log('input', input);
    const response = await axios.post(
      `${url}/api/user/login`,
      input,
    );
    console.log('response', response);
    if (response.data.token) {
      await storeData('token', response.data.token);
      console.log('userdata',response.data.data._id);
      await storeData('userId',response.data.data._id);
      navigation.navigate('BottomTab');
    }
  };
  const handleinputs = (name, text) => {
    setInput({...input, [name]: text});
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.topviewcontainer}>
        <Image
          source={require('../assets/image/logo/ecommerce_logo.png')}
          style={{height: 150, width: 150}}
        />
      </View>
      <KeyboardAvoidingView style={styles.buttomcontainer} behavior="padding">
        <View style={styles.subcontainer1}>
          <View style={styles.subcontainer2}>
            <InputButton
              placeholder="email"
              value={input.email}
              onChangeText={text => {
                handleinputs('email', text);
              }}
            />
            <PasswordButton
              placeholder="password"
              value={input.password}
              hide={eye1}
              onChangeText={text => {
                handleinputs('password', text);
              }}
              onPress={handleEye1Button}
            />
            <Pressable
              style={{marginTop: -10}}
              onPress={() => {
                navigation.navigate('ForgetPasswordPage');
              }}>
              <Text style={{color: 'blue', alignSelf: 'flex-end'}}>
                forget Password?
              </Text>
            </Pressable>
          </View>
          <PressableButton onPress={handleLogin} title="Login" />
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text>Don't have an account?</Text>
            <Pressable
              onPress={() => {
                navigation.navigate('RegisterPage');
              }}>
              <Text style={{color: 'blue'}}>Signup</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: 'white',
  },
  topviewcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  buttomcontainer: {
    flex: 1.5,
  },
  subcontainer1: {
    padding: 40,
    paddingBottom: 70,
  },
  subcontainer2: {
    marginBottom: 40,
  },
  viewButton: {
    borderWidth: 2,
    borderRadius: 7,
    height: 40,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#96aed4',
  },
  text: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
export default LoginPage;
