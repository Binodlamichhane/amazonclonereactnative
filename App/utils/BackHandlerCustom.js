import { Alert, BackHandler } from "react-native";
export const BackHandlerCustom=()=>{
    const backbutton=()=>{
        Alert.alert('exit app','are you sure you want to go back',[{text:'ok',onPress:()=>{
            BackHandler.exitApp();
        }},{text:'cancel',onPress:()=>{}}])
    }
    return BackHandler.addEventListener('hardwareBackPress',backbutton);
}