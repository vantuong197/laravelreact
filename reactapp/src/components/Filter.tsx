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
import { perpage } from "../constant/general";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { FilterProps } from "@/interfaces/BaseServiceInterface";
import useFilterActions from "@/hooks/useFilterActions";
import { useDispatch } from 'react-redux'
import { setIsProcessing } from "@/redux/slice/processingSlice";
import { setToast } from "../redux/slice/toastSlice";
import { SUCCESS } from "@/configs/globalVariable";
const Filter = ({isAnyChecked, checkState, model}:FilterProps) =>{
    const dispatch = useDispatch();
    const { actionSwitch} = useFilterActions();
    const handleValueChange = async(value:string) =>{
        const[action, selectedValue] = value.split("|");
        const response = await actionSwitch(action, selectedValue, checkState, model);
        if(response && response.status === 200){
            dispatch(setIsProcessing());
            dispatch(setToast({message: "Delete records successfully!", type: SUCCESS}))
        }
        
    }
    return (
        <>
            <div className="mb-[15px]">
                <div className="flex justify-between items-center">
                    <div className="flex">
                        <div className="mr-[10px]">
                            {isAnyChecked && (
                                <Select onValueChange={(value) => handleValueChange(value)}>
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
                            )}
                            
                        </div>
                        <div className="mr-10">
                            <Select>
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
                            <div className="flex w-full max-w-sm items-center space-x-2">
                                <Input type="email" placeholder="Enter your key words..." className='w-[250px] focus:outline-none'/>
                                <Button type="submit" className='bg-[#04AA6D] hover:bg-[#04AA6D]'>Search</Button>    
                            </div>
                        </div>
                    </div>
                    <div className="flex border bg-[#04AA6D] text-white rounded-md">
                        <Link to='/user/create' className="p-2">
                            <div className="flex flex-1 justify-start items-center text-[16px]">
                                <FaPlusCircle className="mr-2"/>
                                Create new user
                            </div>
                        </Link>            
                    </div>

                </div>
            </div>
        </>
    )
}

export default Filter;