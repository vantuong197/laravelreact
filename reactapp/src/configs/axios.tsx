import axios from "axios";

const axiosInstance = axios.create({
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
    error =>{
        const { response } = error

        if(response.status === 401){
            //refesh token here
        }

        return Promise.reject(error)
    }
)
export default axiosInstance;