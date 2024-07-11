import axiosInstance from "../configs/axios"
import { handleAxiosError } from "../helpers/axiosHelper";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
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
export {login, logout};