import { createSlice ,combineReducers} from "@reduxjs/toolkit";
const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        AddToCart:(state,action)=>{
                const element=state.find((items)=>items._id == action.payload._id);
                if(element){
                 element.quantity +=1;
                }else{
                 state.push({...action.payload,quantity:1});
                }
        },
        RemoveFromCart:(state,action)=>{
            const element =state.find((items)=>items._id==action.payload._id)
            if(element){
                if(element.quantity > 1 ){
                    element.quantity -=1 ;
                }else{
                    let index=state.indexOf(element);
                    state.splice(index,1);
                }
            }
        }
    }
})

export const {AddToCart,RemoveFromCart} =cartSlice.actions;
export default cartSlice.reducer;
















// import {createSlice} from '@reduxjs/toolkit';
// const counterSlice=createSlice({
//     name:'counter',
//     initialState:0,
//     reducers:{
//         increment:state=>state+1,

//         decrement:state=>state-1,

//         decrementbyAmount:(state,action)=>{
//             state += action.payload;}
//         }
// })
// export const {increment,decrement,decrementbyAmount} = counterSlice.actions;
// export default counterSlice.reducer;