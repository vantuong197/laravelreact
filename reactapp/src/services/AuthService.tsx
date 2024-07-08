import axiosInstance from "../configs/axios"
import { handleAxiosError } from "../helpers/axiosHelper";
type LoginPayload = {
    email: string,
    password: string
}

const login = async(payload:LoginPayload): Promise<boolean> =>{
    try {
        await axiosInstance.post('/login', {
            email: payload.email,
            password: payload.password
        });

        return true;
    } catch (error) {
        handleAxiosError(error);
        return false;
    }

}

const logout = () => {

}
export {login, logout};