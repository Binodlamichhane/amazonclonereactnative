import {View,Text,SafeAreaView,Pressable,StyleSheet,TextInput} from 'react-native';
const PressableButton=(props)=>{
    return(
        
            <Pressable onPress={props.onPress} android_ripple={{color:'#819cc7'}} style={styles.viewButton}><Text style={styles.text}>{props.title}</Text></Pressable>
       
    )
}
export default PressableButton;
const styles=StyleSheet.create({
    viewButton:{
        borderWidth:1,
        borderRadius:7,
        height:50,
        paddingTop:5,
        width:'100%',
        alignSelf:'center',
        backgroundColor:'#96aed4'
       },
       text:{
        fontSize:25,
        color:'#ffff',
        fontWeight:"bold",
        alignSelf:'center',
        marginTop:4
       }
})