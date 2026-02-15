import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
    initialState:{email:""},
    name:"user",
    reducers:{
        setUser:(state, action: PayloadAction<string>)=>{
            state.email=action.payload
        },
        removeUser:(state, action: PayloadAction<string>)=>{
            state.email=""
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;