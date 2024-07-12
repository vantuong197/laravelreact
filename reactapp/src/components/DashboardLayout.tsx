import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { showNotify } from "../helpers/Helper";
import { getUser } from '../services/AuthService';
import { setIsLogin } from '../redux/slice/authSlice';
const DashboardLayout: React.FC = () =>{
    const {message, type} = useSelector((state: RootState) => state.toast);
    const dispatch = useDispatch()

    useEffect(() =>{
        showNotify(message, type, dispatch);
    },[message, type])

    useEffect(() =>{
        const fetchUser = async () =>{
            const user = await getUser();
            console.log(user);
            if(!user){
                dispatch(setIsLogin(user))
            }
        }
        fetchUser();
        // const response  =  getUser();
       
    }, [])  
    return (
        <>
            Dashboard layout
            <Outlet />
        </>
    )
}
export default DashboardLayout;
