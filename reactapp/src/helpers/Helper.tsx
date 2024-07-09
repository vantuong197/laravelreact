import { toast } from "react-toastify";
import { ToastType } from "../contexts/ToastContext";
import { SUCCESS, WARNING, ERROR } from "../configs/globalVariable";

export const showNotify = (
    message: string,
    type: ToastType,
    setMessage: (message: string, type?: ToastType)=>void
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
        setMessage('', null);
    }
}