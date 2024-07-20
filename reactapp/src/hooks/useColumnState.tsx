import { useId, useState } from "react";
import { updateStatusByField } from "../services/BaseService";

interface ColumnState {
    [columnName:string] : boolean
}
interface UserState {
    [userId: string]: ColumnState
}

interface useColumnStateReturn {
    columnState: UserState,
    handleChecked:(userId:number, columnName:string , model:string) => void,
    setInitialColumnState: (users:any[], columnName:string) => void
}
const useColumnState = ():useColumnStateReturn =>{
     const [columnState, setColumnState] = useState<UserState>({})
    const handleChecked = (userId: string, columnName:string, model:string) =>{
        const params = {
            id: userId,
            value: !columnState[userId]?.[columnName],
            column: 'publish',
            model: model
        }
        updateStatusByField(params);
        setColumnState((prevState) => ({
            ...prevState,
            [userId] : {
                ...prevState[userId],
                [columnName]: !prevState[userId]?.[columnName]
            }
        }))
        
    }

    const setInitialColumnState =  (users:any[], columnName:string)=> {
        const initialState = users.reduce((acc:UserState, user:any) =>{
            acc[user.id] = {
                ...acc[user.id],
                [columnName] : user[columnName] === 2
            }
            return acc;
        }, {})
        setColumnState(initialState);
    }
    return {columnState, handleChecked, setInitialColumnState}
}


export default useColumnState;