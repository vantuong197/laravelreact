import CustomInput from "@/components/CustomizeInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "react-select";
const createUser = [
    {label: 'Name', id: 'fullname', type: 'text'},
    {label: 'Email', id: 'email', type: 'text'},
    {label: 'Password', id: 'password', type: 'password'},
    {label: 'Confirm password', id: 'confirm_password', type: 'password'},
    {label: 'BirthDay', id: 'birthday', type: 'date'},

]

const optionsSelect = [
    {value: 'value1', label: 'label1'},
    {value: 'value2', label: 'label2'},
    {value: 'value3', label: 'label3'},
    {value: 'value4', label: 'label4'},
]
const UserCreate = () => {
    return (
        <>
            <div className="flex">
                <div className="leftDiv w-1/2">
                    {createUser.map((item, index) =>{
                        return (
                            <CustomInput 
                                label={item.label}
                                id={item.id}
                                type={item.type}
                                key={index}
                            />
                        )
                    })}
                    <div className="grid grid-cols-4 items-center gap-4 m-2">
                        <Label htmlFor='image' className="text-center">
                            Avatar:
                        </Label>
                        <Input
                            type='file'
                            id='image'
                            className="col-span-3"
                        />
                    </div>
                </div>
                <div className="rightDiv w-1/2">
                    
                    <div className="grid grid-cols-4 items-center gap-4 m-2">
                        <Label htmlFor='image' className="text-center">
                            User group:
                        </Label>
                        <Select options={optionsSelect} className="w-full"/>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4 m-2">
                        <Label htmlFor='image' className="text-center">
                            City:
                        </Label>
                        <Select options={optionsSelect} className="w-full"/>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4 m-2">
                        <Label htmlFor='image' className="text-center">
                        District:
                        </Label>
                        <Select options={optionsSelect} className="w-full"/>
                    </div>

                    <div className="flex">
                        <Label htmlFor='image' className="text-center">
                        Ward:
                        </Label>
                        <Select options={optionsSelect} className="w-[500px]"/>
                    </div>

                    <CustomInput 
                        label='Address'
                        id='address'
                        type='text'
                    />
                </div>
            </div>
            
            
            
        </>
    );
};

export default UserCreate;
