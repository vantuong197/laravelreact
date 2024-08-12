import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CustomInputProps{
    label: string | null,
    id: string | null,
    type: string | null
}
const CustomInput = ({label, id, type}: CustomInputProps) =>{
    return (
        <div className="grid grid-cols-4 items-center gap-4 m-2">
            <Label htmlFor={id} className="text-center">
                {label}:
            </Label>
            <Input
                type={type}
                id={id}
                className="col-span-3 focus-visible:outline-none focus:border-blue-700"
            />
        </div>
    )
}


export default CustomInput;