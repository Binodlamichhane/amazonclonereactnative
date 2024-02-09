import { createSlice ,combineReducers} from "@reduxjs/toolkit";
const addressSlice=createSlice({
    name:'address',
    initialState:[],
    reducers:{
        AddAddress:(state,action)=>{
            if(state.length<4){
                state.push({...action.payload});
            }
        },
        RemoveAddress:(state,action)=>{
            const element = state.find((items)=>items.houseNo==action.payload.houseNo);  
            if(element){
                let index=state.indexOf(element);
                state.splice(index,1);
            }

        }
    }
})
export const {AddAddress,RemoveAddress} =addressSlice.actions;
export default addressSlice.reducer;