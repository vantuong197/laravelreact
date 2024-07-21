import { CheckStateProps } from "@/interfaces/BaseServiceInterface";
import { deleteAll, updateFiledByParams } from "@/services/BaseService";
const useFilterActions = () =>{

    const actionSwitch = async (action:string, selectedValue: string, checkState:CheckStateProps, model:string)=>{

        const selectedListIds = Object.keys(checkState).filter((key) => checkState[Number(key)])
        switch (action) {
            case "deleteAll":
                return await deleteAll(selectedListIds, model);
            case "publish":
                updateFiledByParams(selectedListIds);
                break;
        }
    }
    return { actionSwitch}
}


export default useFilterActions;