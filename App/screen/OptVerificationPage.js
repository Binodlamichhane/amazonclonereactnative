import {useState,useRef, useEffect} from 'react';
import { Text,View,StyleSheet, TextInput, Pressable } from 'react-native';
import axios from 'axios';
import { getData,storeData } from '../utils/AsyncStorage';
const OtpVerificationPage=({navigation})=>{
    const [text,setText]=useState('');
    const [count,setCount]=useState(60);
    const [loading,setIsLoading]=useState(false);
    const handlePress=async()=>{
        setIsLoading(true);
        const userid= await getData('_id')
        console.log('userid',userid);
        const response= await axios.post('https://binodlamichhane.in/api/user/verifyPassword',{id:userid,otp:text});
        console.log(response);
        if(response.status==200){
            await storeData('otpVerified',"true");
            navigation.navigate('ForgetPasswordPage',{ onGoBack: () => setReload(!reload) })
        }else{
            alert('Invalid OTP')
        }
        setIsLoading(false);
        
    }
    useEffect(()=>{
        timer=setInterval(()=>{
            if(count==0){
                clearInterval(timer);
            }else{
                setCount(count-1);
            }  
        }, 1000)
        return()=>{
            clearInterval(timer); 
        }

    },[count])
    return(
        <View style={styles.maincontainer}>

            <View style={styles.topcontainer}>
                    <Text style={{fontSize:30,color:'blue',fontWeight:'bold',textShadowColor:'black',textShadowRadius:2}}>Enter Verification Code</Text>
            </View>
            <View style={styles.middlecontainer}>
                <View>
                    <Text style={{alignSelf:'center',fontSize:18,fontWeight:'bold', color:'blue'}}>Enter OTP</Text>
                    <Text style={{color:'black',fontSize:15,fontWeight:'bold'}}>We have send a OTP on you gmail</Text>
                </View>
            </View>
            <View style={styles.buttomcontainer}>
                <View style={styles.insideBtmContainer}>
                    <TextInput 
                     value={text[0]}
                       style={styles.textinput}
                        maxLength={1}
                        autofocus={true}
                        editable={false}
                     />
                    <TextInput
                      value={text[1]}
                      style={styles.textinput}
                         maxLength={1}
                         editable={false}
                      />
                    <TextInput
                    value={text[2]}  
                    style={styles.textinput}
                     maxLength={1} 
                     editable={false}
                    />
                    <TextInput
                      value={text[3]}  
                      style={styles.textinput}
                       maxLength={1}
                       editable={false}
                            />
                    <TextInput 
                    value={text[4]}
                    style={styles.textinput} 
                     maxLength={1} 
                     editable={false}
                   />   
                </View>
                <TextInput  autoFocus={true} style={{color:'white',position:'absolute',width:"100%"}} maxLength={5} keyboardType='numeric' caretHidden={true} onChangeText={(text)=>{ setText(text);}}/>

                <Text 
                    style={{marginTop:30,alignSelf:'center'}}>
                    OTP auto resend {count} sec
                    </Text>
                {text.length==5?
                <Pressable 
                        onPress={handlePress}
                         style={{marginTop:60,borderWidth:1,marginHorizontal:60,backgroundColor:'#80d9d3',borderRadius:8}}>
                            <Text style={{color:'blue',fontSize:35,alignSelf:'center'}}>Verify</Text>
                    </Pressable>:
                    <Pressable 
                         style={{marginTop:60,borderWidth:1,marginHorizontal:60,backgroundColor:'#807d77',borderRadius:8}}>
                            <Text style={{color:'#b8b4ad',fontSize:35,alignSelf:'center'}}>Verify</Text>
                    </Pressable>}
                
            </View>
        </View>
    )
}
export default OtpVerificationPage;
const styles=StyleSheet.create({
    maincontainer:{
        flex:1,
        backgroundColor:'white'
    },
    topcontainer:{
        flex:0.4,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:60
    },
    middlecontainer:{
        flex:0.6,
        justifyContent:'center',
        alignItems:'center'
    },
    buttomcontainer:{
        flex:1.2,
    },
    insideBtmContainer:{
        marginHorizontal:50,
        flexDirection:'row',
        justifyContent:'space-between',
        
    },
    textinput:{
        borderWidth:1,
        width:45,
        fontSize:30,
        borderRadius:5,
        textAlign:'center',
        backgroundColor:'skyblue',
        color:'white'
    }
})