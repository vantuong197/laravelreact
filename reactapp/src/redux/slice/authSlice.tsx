import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";


export interface AuthState {
    isAuthenticated: boolean,
    user: User | null
}

const initialState: AuthState ={
    isAuthenticated: false,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setIsLogin: (state, action: PayloadAction<User | null>) =>{
            state.isAuthenticated = true;
            state.user = action.payload
        },
        setIsLogout: (state) =>{
            state.isAuthenticated = false;
            state.user = null
        }
    }
})

export const {setIsLogin, setIsLogout} =  authSlice.actions

export default authSlice.reducer

