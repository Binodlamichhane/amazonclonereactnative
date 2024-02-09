import { StyleSheet, Text, View,Image ,TextInput, Pressable} from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native';

export default function SearchPage() {
    const navigation=useNavigation();
  return (
    <View>
      <View style={{height: 55, backgroundColor: '#77a69e',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
        <Pressable onPress={()=>{navigation.goBack()}} style={{padding:5,paddingRight:10}}>
      <Image source={require('../assets/image/backicon/back-icon.png')} style={{height:20,width:20}}/>
      </Pressable>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderRadius: 10,
            margin: 5,
            paddingHorizontal:10,
            backgroundColor: 'white',
          }}>
           
          <Image
            source={require('../assets/image/searchicon/search_icon.png')}
          />
          <TextInput
            style={{width: 270, color: 'black'}}
            placeholder="Search Amazon.in"
            autoFocus={true}
          />
          <Image
            source={require('../assets/image/microphone/microphone.png')}
            style={{height: 20, width: 20}}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})