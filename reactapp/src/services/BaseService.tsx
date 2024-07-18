import axiosInstance from "../configs/axios"
import { handleAxiosError } from "../helpers/axiosHelper";
import { User } from "../types/User";
interface UpdateStatusByFieldParam {
    id: string, 
    value: boolean, 
    column: string, 
    model: string
}

const updateStatusByField = async ({id, value, column, model}: UpdateStatusByFieldParam) =>{
    try {
        const response = await axiosInstance.put(`/${model}/${id}/status`, {value, column});
        console.log(response);
        
    } catch (error) {
        console.log(error);
        
    }
}

export {updateStatusByField}