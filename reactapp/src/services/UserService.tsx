import axiosInstance from "../configs/axios"
import { handleAxiosError } from "../helpers/axiosHelper";
import { User } from "../types/User";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
interface Users  {
    name: string,
    phone: string | null,
    image: string | null,
    address: string | null,
    birthday: string | null,
    created_at: string | null,
    description: string | null,
    district_id: string | null,
    email: string | null,
    email_verified_at: string | null,
    id: number,
    province_id: string | null,
    updated_at: string | null,
    ward_id: string | null,
}
const pagination = async (query: string):Promise<Users> =>{
    
    const response = await axiosInstance.get(`/users?${query}`);
    if(response.data.current_page > response.data.last_page){
        response.data.links[1].active = true;
    }
    return response.data;
}

const model = 'users';
const tableColumn = [
    {
        name: 'ID',
        render: (item: User) =><span>{item.id}</span>
    },
    {
        name: 'User Name',
        render: (item: User) =><span>{item.name}</span>
    },
    {
        name: 'Phone number',
        render: (item: User) =><span>{item.phone}</span>
    },
    {
        name: 'Email',
        render: (item: User) =><span>{item.email}</span>
    },
    {
        name: 'Address',
        render: (item: User) =><span>{item.address ?? '-'}</span>
    },
    {
        name: 'User Role',
        render: (item: User) =><span>{'-'}</span>
    }
]

const actions = [
    {
        path: '/user/update',
        icon: <FaRegEdit className="text-2xl"/>
    },
    {
        path: '/user/delete',
        icon: <MdDeleteOutline className="text-2xl text-[#ec4758]"/>
    }
]
export {pagination, model, tableColumn, actions};