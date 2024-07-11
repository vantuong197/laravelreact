
import { useEffect } from "react";
import { showNotify } from "../helpers/Helper";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
function DashboardPage() {
    const {isAuthenticated, user} = useSelector((state: RootState) => state.auth);
    useEffect(() =>{
        console.log(isAuthenticated)
    }, [])
    return <>Dashboard page</>;
}

export default DashboardPage;
