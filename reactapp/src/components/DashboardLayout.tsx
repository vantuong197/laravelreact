import React from 'react';
import { Outlet } from 'react-router-dom';
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
const DashboardLayout: React.FC = () =>{
    const {message, type} = useSelector((state: RootState) => state.toast);
    const dispatch = useDispatch()
    return (
        <>
            Dashboard layout
            <Outlet />
        </>
    )
}
export default DashboardLayout;
