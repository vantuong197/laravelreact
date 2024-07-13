import axios, { AxiosRequestConfig } from "axios";
import { User } from "../types/User";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/auth',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        
    },
    withCredentials: true

})

const reCallApi = axios.create({
    baseURL: 'http://localhost:8000/api/auth',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        
    },
    withCredentials: true

})
axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    async error =>{
        const originalRequest: AxiosRequestConfig & {_retry?: boolean} = error.config;

        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            
            try {
                await getRefreshToken();
                return axiosInstance(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error)
    }
)

const getRefreshToken = async () =>{
    try {
        const response = await reCallApi.post('refresh');
        return response;
    } catch (error) {
        throw new Error('Can not refesh token!')
    }
}
export default axiosInstance;