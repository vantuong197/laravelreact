import { toast } from "react-toastify";
import { SUCCESS, WARNING, ERROR } from "../configs/globalVariable";
import { clearToast } from "../redux/slice/toastSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";


type ToastType = typeof SUCCESS | typeof WARNING | typeof ERROR | null;
export const showNotify = (
    message: string,
    type: ToastType,
    dispatch: Dispatch<UnknownAction>
) => {
    
    if(message){
        switch(type){
            case SUCCESS:
                toast.success(message)
                break
            case WARNING:
                toast.warning(message)
                break
            case ERROR:
                toast.warning(message)
                break;
            default:
                break;
            
        }
        dispatch(clearToast())
    }
}