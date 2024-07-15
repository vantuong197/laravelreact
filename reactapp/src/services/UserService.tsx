import axiosInstance from "../configs/axios"
import { handleAxiosError } from "../helpers/axiosHelper";
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
const pagination = async (page: number | null):Promise<Users> =>{
    const response = await axiosInstance.get(`/users?page=${page}`);
    return response.data;
}


export {pagination};