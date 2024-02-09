import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import axios from 'axios';
import {InputButton, PasswordButton} from '../components/Button';
import {Imagelogo} from '../components/Imagelogo';
import {SafeAreaView} from 'react-native-safe-area-context';
import PressableButton from '../components/PressableButton';
import {getData, storeData, clearall} from '../utils/AsyncStorage';

const ForgetPasswordPage = ({navigation, params}) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [eye1, setEye1] = useState(true);
  const [eye2, setEye2] = useState(true);
  const [visible, setVisible] = useState(false);
  const [reload, setReload] = useState(false);
  const handleinput = (name, value) => {
    setInput({...input, [name]: value});
  };

  useEffect(() => {
    console.log('reloaded');
  }, [reload]);

  (async () => {
    const data = await getData('otpVerified');
    if (data == 'true') {
      setVisible(true);
    }
  })();

  const handleLogin = async () => {
    if (input.password == input.confirmPassword && input.password) {
      console.log('email and password', input.email, input.password);
      const response = await axios.patch(
        'https://binodlamichhane.in/api/user',
        {email: input.email, password: input.password},
      );
      console.log('resposne', response);
      if (response.status == 200) {
        navigation.navigate('LoginPage');
      }
    } else if (input.email && !input.password) {
      console.log('email', input.email);
      const response = await axios.post(
        'https://binodlamichhane.in/api/user/forgetPassword',
        {email: input.email},
      );
      console.log('respobse', response.data);
      const id = response.data.data._id;
      console.log(id);
      if (response.status == 200) {
        await storeData('_id', id);
        navigation.navigate('OtpVerificationPage');
      }
    } else {
      Alert.alert('invalid', 'data is invalid', [
        {text: 'ok', onPress: () => {}},
      ]);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', padding: 40}}>
      <View style={styles.outercontainer}>
        <Imagelogo />
      </View>

      <KeyboardAvoidingView style={styles.innercontainer} behavior="padding">
        <Text style={{alignSelf: 'center', marginBottom: 20, fontSize: 20}}>
          Create New Password
        </Text>
        <InputButton
          placeholder="Email"
          value={input.email}
          onChangeText={text => {
            handleinput('email', text);
          }}
        />

        {visible ? (
          <PasswordButton
            placeholder="Password"
            value={input.password}
            hide={eye1}
            onChangeText={text => {
              handleinput('password', text);
            }}
            onPress={() => {
              setEye1(!eye1);
            }}
          />
        ) : null}
        {visible ? (
          <PasswordButton
            placeholder="Confirm Password"
            value={input.confirmPassword}
            hide={eye2}
            onChangeText={text => {
              handleinput('confirmPassword', text);
            }}
            onPress={() => {
              setEye2(!eye2);
            }}
          />
        ) : null}

        <PressableButton onPress={handleLogin} title="Submit" />
        <Pressable
          style={{alignSelf: 'flex-end', marginTop: 20}}
          onPress={() => {
            navigation.navigate('LoginPage');
          }}>
          <Text style={{color: 'blue'}}>{'->->'}login page</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default ForgetPasswordPage;
const styles = StyleSheet.create({
  outercontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innercontainer: {
    flex: 1,
  },
});
