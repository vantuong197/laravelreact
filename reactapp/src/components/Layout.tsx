import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { showNotify } from "../helpers/Helper";
import Header from './Header';
import Aside from './Aside';
import '../assets/scss/Style.scss'
const Layout: React.FC = () =>{
    const {message, type} = useSelector((state: RootState) => state.toast);
    const dispatch = useDispatch()

    useEffect(() =>{
        showNotify(message, type, dispatch);
    },[message, type])

    return (
        <div className='page'>
            <Header/>
            <Aside />
            <div className='main-content'>
                <Outlet />
            </div>
            
        </div>
    )
}
export default Layout;
