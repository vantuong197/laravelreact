import CustomInput from "@/components/CustomizeInput";
import CustomSelectBox from "@/components/CustomizeSelectbox";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Select from "react-select";
const createUser = [
    {label: 'Name', id: 'fullname', type: 'text'},
    {label: 'Email', id: 'email', type: 'text'},
    {label: 'Password', id: 'password', type: 'password'},
    {label: 'Confirm password', id: 'confirm_password', type: 'password'},
    {label: 'BirthDay', id: 'birthday', type: 'date'},
    {label: 'Avatar', id: 'imga', type: 'file'},

]

const selectBox = [
    {
        title: "User group",
        placeHolder: 'Select user group',
        options: [
            {value: 'value1', label: 'label1'},
            {value: 'value2', label: 'label2'},
            {value: 'value3', label: 'label3'},
            {value: 'value4', label: 'label4'},
        ]
    },
    {
        title: "City",
        placeHolder: 'Select City',
        options: [
            {value: 'value1', label: 'label1'},
            {value: 'value2', label: 'label2'},
            {value: 'value3', label: 'label3'},
            {value: 'value4', label: 'label4'},
        ]
    },
    {
        title: "District",
        placeHolder: 'Select District',
        options: [
            {value: 'value1', label: 'label1'},
            {value: 'value2', label: 'label2'},
            {value: 'value3', label: 'label3'},
            {value: 'value4', label: 'label4'},
        ]
    },
    {
        title: "Ward",
        placeHolder: 'Select Ward',
        options: [
            {value: 'value1', label: 'label1'},
            {value: 'value2', label: 'label2'},
            {value: 'value3', label: 'label3'},
            {value: 'value4', label: 'label4'},
        ]
    }
]
const optionsSelect = [
    
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
                    <div className="text-center">
                        <Avatar className="w-[100px] h-[100px] inline-block">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                
                <div className="rightDiv w-1/2">
                    {selectBox.map((item, index) =>{
                        return (
                            <CustomSelectBox 
                                label={item.title}
                                placeHolder={item.placeHolder}
                                optionsSelect={item.options}
                                key={index}
                            />
                        )
                    })}
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
