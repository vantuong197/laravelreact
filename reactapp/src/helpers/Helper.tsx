import { toast } from "react-toastify";
import { ToastType } from "../contexts/ToastContext";


export const showNotify = (
    message: string,
    type: ToastType,
    setMessage: (message: string, type?: ToastType)=>void
) => {
    if(message){
        switch(type){
            case 'success':
                toast.success(message)
                break
            case 'warning':
                toast.warning(message)
                break
            case 'error':
                toast.warning(message)
                break;
            default:
                break;
            
        }
        setMessage('', null);
    }
}