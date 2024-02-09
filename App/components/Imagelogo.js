import {Image,StyleSheet,View} from 'react-native';
export const Imagelogo=()=>{
    return(
           
                <Image style={styles.imagestyle} source={require('../assets/image/logo/ecommerce_logo.png')}/>
    )
}
const styles=StyleSheet.create({
    imagestyle:{
        height:150,
        width:150,
    }
})