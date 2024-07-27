import axiosInstance from "@/configs/axios"
import { handleAxiosError } from "@/helpers/axiosHelper";
import { UpdateStatusByFieldParam } from "@/interfaces/BaseServiceInterface";
import { AxiosResponse } from "axios";
const updateStatusByField = async ({id, value, column, model}: UpdateStatusByFieldParam) =>{
    try {
        const response = await axiosInstance.put(`/${model}/${id}/status`, {value, column});
        console.log(response);
        
    } catch (error) {
        console.log(error);
        
    }
}

const deleteAll = async (selectedListIds:string[], model:string): Promise<AxiosResponse<any, any>> =>{
    try {
        const response = await axiosInstance.delete('records/delete/batch', {
            data: {
                selectedListIds,
                model
            }
        })
        return response;
        
    } catch (error) {
        handleAxiosError(error)
    }
    
}

const updateFiledByParams = async (selectedListIds:string[],selectedValue:string,action:string, model:string) =>{
    try {
        const response = await axiosInstance.put('records/update/batch', {
            selectedListIds,
            selectedValue,
            model,
            field: action
        })
        return response;
    } catch (error) {
        handleAxiosError(error)
    }
    
}

export {updateStatusByField, deleteAll, updateFiledByParams}