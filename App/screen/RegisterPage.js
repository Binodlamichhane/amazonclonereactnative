import {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {InputButton, PasswordButton} from '../components/Button';
import PressableButton from '../components/PressableButton';
import Loader from '../utils/Loader';
import axios from 'axios';
import {getDate, storeData} from '../utils/AsyncStorage';
import url from '../utils/Constant.js';
const RegisterPage = ({navigation}) => {
  const [eye1, setEye1] = useState(true);
  const [eye2, setEye2] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleChange = (name, text) => {
    setInput({
      ...input,
      [name]: text,
    });
  };
  const handleEye1Button = () => {
    setEye1(!eye1);
  };
  const handleEye2Button = () => {
    setEye2(!eye2);
  };
  const handleRegister = async () => {
    try {
      const {firstname, lastname, email, password, confirmPassword} = input;
      if (
        firstname.length > 3 &&
        lastname.length > 2 &&
        email.length > 12 &&
        password.length > 7 &&
        confirmPassword.length > 7
      ) {
        setIsLoading(true);

        const res = await axios.post(
          'https://binodlamichhane.in/api/users/signup',
          input,
        );
        setIsLoading(false);
        console.log(res.data);
        switch (res.status) {
          case 201:
            await storeData(res.data.token);
            setInput({
              firstname: '',
              lastname: '',
              email: '',
              password: '',
              confirmPassword: '',
            });
            setIsLoading(false);
            navigation.navigate('HomePage', {userData: res.data.data});
        }
      } else {
        Alert.alert(
          'Invalid Field',
          'please enter all field correct',
          [{text: 'Ok', onPress: () => {}}],
          {cancelable: true},
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <SafeAreaView style={styles.safeview}>
      {isloading ? <Loader /> : null}
      <View style={styles.topviewcontainer}>
        <Image
          source={require('../assets/image/logo/ecommerce_logo.png')}
          style={{height: 150, width: 150}}
        />
      </View>
      <View style={{flex: 3, width: '100%', alignItems: 'center'}}>
        <ScrollView
          style={styles.outercontainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
            <View style={styles.InputButton}>
              <InputButton
                placeholder="FirstName"
                value={input.firstname}
                onChangeText={text => handleChange('firstname', text)}
              />
              <InputButton
                placeholder="LastName"
                value={input.lastname}
                onChangeText={text => handleChange('lastname', text)}
              />
              <InputButton
                placeholder="Email"
                value={input.email}
                onChangeText={text => handleChange('email', text)}
              />
              <PasswordButton
                placeholder="Password"
                value={input.password}
                onPress={handleEye1Button}
                hide={eye1}
                onChangeText={text => handleChange('password', text)}
              />
              <PasswordButton
                placeholder="Confirm Password"
                value={input.confirmPassword}
                onPress={handleEye2Button}
                hide={eye2}
                onChangeText={text => handleChange('confirmPassword', text)}
              />
            </View>
            <PressableButton onPress={handleRegister} title="Register" />
            <View style={styles.bottomcontainer}>
              <Text>Already have an account?</Text>
              <Pressable
                onPress={() => {
                  navigation.navigate('LoginPage');
                }}>
                <Text style={{color: 'blue'}}>Login</Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default RegisterPage;
const styles = StyleSheet.create({
  safeview: {
    backgroundColor: 'white',
    flex: 1,
  },
  topviewcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  text: {
    verticalAlign: 'middle',
    fontSize: 24,
  },
  outercontainer: {
    height: '75%',
    width: '75%',
  },
  InputButton: {
    marginBottom: 40,
    borderRadius: 7,
  },
  bottomcontainer: {
    margin: 15,
    alignItems: 'center',
  },
});
