import AsyncStorage from "@react-native-async-storage/async-storage";
export const storeData=async(key,value)=>{
    try{
        await AsyncStorage.setItem(key,value);
    }catch(error){
        console.log('cannot save ',error);
    }
}
export const getData=async(key)=>{
    try{
       const value=await AsyncStorage.getItem(key);
        if(value!==null)return value;
    }catch(error){
        console.log('cannot get token',error);
    }
}
export const clearall = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.clear()
      return keys;
    } catch(e) {
      
    }
  }