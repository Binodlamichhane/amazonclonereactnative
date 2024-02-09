import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
const Loader = () => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <ActivityIndicator size={30} color="black" />
      </View>
    </View>
  );
};
export const CustomLoader = props => {
  return (
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator size="large" color="#000000" animating={true} />
        <Text style={{textAlign: 'center', color: 'white'}}>'Loading...'</Text>
      </View>
    </View>
  );
};
export const AddressLoader = () => {
  return (
    <View
      style={{
        height: '40%',
        width: '100%',
        backgroundColor: '#000000',
        opacity: 0.5,
        zIndex: 10,
        top:200,
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator size="large" color="#000000" animating={true} />
      </View>
    </View>
  );
};
export default Loader;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#000000',
    opacity: 0.5,
    position: 'absolute',
    zIndex: 4,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    opacity: 1,
    position: 'absolute',
    zIndex: 1,
  },
  modalBackground: {
    position: 'absolute',
    top: 408,
    height: '50%',
    width: '110%',
    zIndex: 10,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
