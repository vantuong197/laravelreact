import axiosInstance from "@/configs/axios"
import { handleAxiosError } from "@/helpers/axiosHelper";
import { UpdateStatusByFieldParam } from "@/interfaces/BaseServiceInterface";
const updateStatusByField = async ({id, value, column, model}: UpdateStatusByFieldParam) =>{
    try {
        const response = await axiosInstance.put(`/${model}/${id}/status`, {value, column});
        console.log(response);
        
    } catch (error) {
        console.log(error);
        
    }
}

const deleteAll = async (selectedListIds:string[], model:string) =>{
    console.log(selectedListIds, model);
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

const updateFiledByParams = async (selectedListIds:string[]) =>{
    console.log(selectedListIds);
    
}

export {updateStatusByField, deleteAll, updateFiledByParams}