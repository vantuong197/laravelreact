import Select from "react-select";
import { Label } from "@/components/ui/label";

interface CustomSelectBoxProps{
    label: string | null,
    placeHolder: string | null,
    optionsSelect: {
        value: string,
        label: string
    }[],
}
const CustomSelectBox = ({label, placeHolder, optionsSelect}: CustomSelectBoxProps) =>{
    return (
        <div className="grid grid-cols-colCustom items-center gap-4 m-2">
            <Label className="text-center">
                {label}
            </Label>
            <Select options={optionsSelect} placeholder={placeHolder} className="w-full"/>
        </div>
    )
}


export default CustomSelectBox;