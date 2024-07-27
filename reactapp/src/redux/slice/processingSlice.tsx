import { createSlice } from "@reduxjs/toolkit";


export interface AuthState {
    isProcessing: boolean,
}

const initialState: AuthState ={
    isProcessing: false,
}

export const processingSlice = createSlice({
    name: 'processing',
    initialState,
    reducers:{
        setIsProcessing: (state) =>{
            state.isProcessing = !state.isProcessing;
        },
        setClearProcessing: (state) =>{
            state.isProcessing = false;
        }
    }
})

export const {setIsProcessing, setClearProcessing} =  processingSlice.actions

export default processingSlice.reducer

