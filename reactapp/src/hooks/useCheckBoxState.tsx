import { useEffect, useState } from "react";

const useCheckBoxState = (data: any, model:string) =>{
    const [checkState, setCheckState] = useState<{[key: number] : boolean}>({});
    const [checkAllState, setCheckAllState] = useState<boolean>(false);

    const handleCheckChange = (id:number) =>{
        const updateCheckState = {...checkState, [id] : !checkState[id]}
        setCheckState(updateCheckState)

        const isAllChecked = Object.values(updateCheckState).every(value => value === true)
        setCheckAllState(isAllChecked)
    }

    const handleCheckAllChange = () =>{
        setCheckAllState(prevState => !prevState)
        const prevCheckState = {...checkState}
        const newCheckState = {}
        for(const [key] of Object.entries(prevCheckState)){
            newCheckState[key] = !checkAllState
        }
        setCheckState(newCheckState)
        
    }

    const getIsAnyCheck = () => Object.values(checkState).some(value => value)
    useEffect(() =>{
        if(data && data[model]){
            const initialCheckboxState = data[model].reduce((acc:any, item: any) =>{
                acc[item.id] = false
                return acc
            }, {})
            setCheckState(initialCheckboxState);
            setCheckAllState(false);
        }
        
        
    }, [data])

    return {checkState, checkAllState, handleCheckChange, handleCheckAllChange, getIsAnyCheck}
}


export default useCheckBoxState;