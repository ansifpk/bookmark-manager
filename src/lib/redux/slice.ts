import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
    initialState:{id:""},
    name:"user",
    reducers:{
        setUser:(state, action: PayloadAction<string>)=>{
            state.id=action.payload
        },
        removeUser:(state, action: PayloadAction<string>)=>{
            state.id=""
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;