import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
export const InputButton = props => {
  return (
    <TextInput
      style={styles.inputbutton}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      Required
    />
  );
};
export const PasswordButton = props => {
  return (
    <View
      style={{
        borderWidth: 1,
        flexDirection: 'row',
        height: 50,
        borderRadius: 7,
        marginBottom: 20,
      }}>
      <TextInput
        style={styles.passwordButton}
        placeholder={props.placeholder}
        value={props.value}
        secureTextEntry={props.hide}
        onChangeText={props.onChangeText}
      />
      <Pressable
        onPress={props.onPress}
        style={{alignSelf: 'center', padding: 5}}>
        {props.hide ? (
          <Image source={require('../assets/image/eye/Eye_.png')} />
        ) : (
          <Image source={require('../assets/image/crosseye/CrossEye_.png')} />
        )}
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  inputbutton: {
    color: 'black',
    borderWidth: 1,
    borderRadius: 7,
    height: 50,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  passwordButton: {
    color: 'black',
    borderRadius: 7,
    height: 50,
    width: '85%',
    alignSelf: 'center',
    marginRight: 7,
  },
});
