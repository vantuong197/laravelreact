import axiosInstance from "../configs/axios"
import { handleAxiosError } from "../helpers/axiosHelper";
import { User } from "../types/User";
type LoginPayload = {
    email: string,
    password: string
}


const login = async(payload:LoginPayload):Promise<User | null> =>{
    try {
        const response = await axiosInstance.post('/login', {
            email: payload.email,
            password: payload.password
        });
        return response.data.user;
    } catch (error) {
        handleAxiosError(error);
        return null;
    }

}

const logout = () => {

}

const getUser = async ():Promise<User | null> =>{

    try {
        const response = await axiosInstance.get('/me',{withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error)
    }

    return null;
}
export {login, logout, getUser};