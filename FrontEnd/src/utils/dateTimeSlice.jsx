import { createSlice } from "@reduxjs/toolkit";

const dateTime=createSlice({
    name:"deadline",
    initialState:[],
    reducers:{
        setDeadline:(state,action)=>{
            let dateTime=action.payload.dateTime;
            state.push({dateTime});
        }
    }
})

export const {setDeadline}=dateTime.actions;
export default dateTime.reducer;