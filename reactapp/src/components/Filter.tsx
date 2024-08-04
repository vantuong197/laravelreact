import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TiDelete } from "react-icons/ti";
import { FaCheck } from "react-icons/fa6";
import { FaRedo } from "react-icons/fa";
import { perpage, status, sort } from "@/constant/general";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { FilterProps } from "@/interfaces/BaseServiceInterface";
import useFilterActions from "@/hooks/useFilterActions";
import { useDispatch } from 'react-redux'
import { setIsProcessing } from "@/redux/slice/processingSlice";
import { setToast } from "@/redux/slice/toastSlice";
import { SUCCESS } from "@/configs/globalVariable";
import CustomizeAlertDialog from "./AlertDialog";
import {  useState } from "react";

import useDebounce from "@/hooks/useDebounce";
const Filter = ({isAnyChecked, checkState, model, handleQueryString, filters, openDialog}:FilterProps):React.ReactNode =>{
    const dispatch = useDispatch();
    const { actionSwitch } = useFilterActions();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedVal, setSelectedVal] = useState<string>('');
    const {debounce} = useDebounce();
    
    const doActionConfirm = async(value:string): Promise<void> =>{
        const[action, selectedValue] = value.split("|");
        const response = await actionSwitch(action, selectedValue, checkState, model);
        closeConfirmDialog();
        
        if(response && response.status === 200){
            
            dispatch(setIsProcessing());
            dispatch(setToast({message: response.data.message, type: SUCCESS}))
        }
        
    }
    const setDebounceSearchKeyword = debounce((value:string, field:string)=>{
        handleQueryString(value, field)
    },400)
    const closeConfirmDialog = () =>{
        setIsOpen(false);
        setSelectedVal("");
    }
    const openConfirmDialog = (value: string) =>{
        setIsOpen(true);
        setSelectedVal(value);
    }
   
    
    return (
        <>
            <div className="mb-[15px]">
                <CustomizeAlertDialog 
                    isOpen={isOpen}
                    closeDialog={closeConfirmDialog}
                    confirmAction={() => doActionConfirm(selectedVal)}
                />
                <div className="flex justify-between items-center">
                    <div className="flex">
                    {isAnyChecked && (
                        <div className="mr-10">
                            
                                <Select onValueChange={(value) => openConfirmDialog(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="[Select actions]" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem className="cursor-pointer" value="deleteAll">
                                        <div className="flex items-center justify-start">
                                            <TiDelete className="mr-[5px]"/>Delete All
                                        </div>
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="publish|2">
                                        <div className="flex items-center justify-start">
                                            <FaCheck className="mr-[5px]"/>Publish All
                                        </div>
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="publish|1">
                                        <div className="flex items-center justify-start">
                                            <FaRedo className="mr-[5px]"/>Unpublish All
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            
                            
                        </div>
                    )}
                        <div className="mr-10">
                            <Select onValueChange={(value) => handleQueryString(value, 'perpage')} defaultValue={filters['perpage'] ? filters['perpage'] : '10'}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="[Select records]" />
                                </SelectTrigger>
                                <SelectContent >
                                    {perpage.map((item, index) => (
                                        <SelectItem key={index} className="cursor-pointer" value={item}>{`${item} records`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mr-10">
                            <Select onValueChange={(value) => handleQueryString(value, 'publish')} defaultValue={filters['publish']}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="[Select status]" />
                                </SelectTrigger>
                                <SelectContent >
                                    {status.map((item, index) => (
                                        <SelectItem key={index} className="cursor-pointer" value={item.value}>{`${item.name}`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="mr-10">
                            <Select onValueChange={(value) => handleQueryString(value, 'sort')} defaultValue={filters['sort']}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="[Sort records]" />
                                </SelectTrigger>
                                <SelectContent >
                                    {sort.map((item, index) => (
                                        <SelectItem key={index} className="cursor-pointer" value={item.value}>{`${item.name}`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mr-10">
                            <div className="flex w-full max-w-sm items-center space-x-2">
                                <Input 
                                    type="email" 
                                    placeholder="Enter your key words..." 
                                    className='w-[250px] focus:outline-none'
                                    onChange={(e) => setDebounceSearchKeyword(e.target.value, 'keyword')}
                                />
                                <Button type="submit" className='bg-[#04AA6D] hover:bg-[#04AA6D]'>Search</Button>    
                            </div>
                        </div>
                    </div>
                    <div className="flex border  text-white rounded-md" onClick={openDialog}>
                        <Button className="p-2 bg-[#04AA6D] hover:bg-[#04AA6D]">
                            <div className="flex flex-1 justify-start items-center text-[16px]">
                                <FaPlusCircle className="mr-2"/>
                                Create new user
                            </div>
                        </Button>            
                    </div>

                </div>
            </div>
        </>
    )
}

export default Filter;