import { createSlice } from "@reduxjs/toolkit";

const taskDescriptor=createSlice({
    name:'taskDescriptor',
    initialState:[],
    reducers:{
        addDescription:(state,action)=>{
            let desc=action.payload.desc;
            state.push({desc});
        }
    }
})

export const {addDescription}=taskDescriptor.actions;
export default taskDescriptor.reducer;