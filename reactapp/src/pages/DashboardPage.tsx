
import { useEffect } from "react";
import { showNotify } from "../helpers/Helper";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { breadcrumbElement } from "../constant/breadcrumb";
import PageHeading from "../components/Breadcrumb";
function DashboardPage() {
    const {isAuthenticated, user} = useSelector((state: RootState) => state.auth);
    useEffect(() =>{
        console.log(isAuthenticated)
    }, [])
    return (
        <>
            <PageHeading breadcrumbProps={breadcrumbElement.DashBoard}/>
        </>
    );
}

export default DashboardPage;
