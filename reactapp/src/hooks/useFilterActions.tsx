import { CheckStateProps } from "@/interfaces/BaseServiceInterface";
import { deleteAll, updateFiledByParams } from "@/services/BaseService";
import { AxiosResponse } from "axios";
const useFilterActions = () =>{

    const actionSwitch = async (action:string, selectedValue: string, checkState:CheckStateProps, model:string): Promise<AxiosResponse<any, any> | void>=>{

        const selectedListIds = Object.keys(checkState).filter((key) => checkState[Number(key)])
        switch (action) {
            case "deleteAll":
                return await deleteAll(selectedListIds, model);
            case "publish":
                return await updateFiledByParams(selectedListIds, selectedValue,action, model);
        }
    }
    return { actionSwitch}
}


export default useFilterActions;