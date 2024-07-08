import axios from "axios";
import { toast } from "react-toastify";

const handleAxiosError = (error:unknown):void =>{

    if(axios.isAxiosError(error)){
        if(error.response && error.response.data && error.response.data.error){
            toast.error(error.response.data.error)
        }else{
            toast.error('Network Error!')
        }
    }else{
        toast.error('An unknown error has occurred!')
    }
}

export {handleAxiosError}