import { PropsWithChildren, useEffect } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setToast } from "../redux/slice/toastSlice";
import { ERROR } from "../configs/globalVariable";
type ProtectedRouteProps = PropsWithChildren;


const AuthMidleware = ({children}: ProtectedRouteProps) =>{
    const {isAuthenticated, user} = useSelector((state: RootState) => state.auth);
    const navigator = useNavigate();
    const dispatch = useDispatch();
    useEffect(() =>{
        if(!isAuthenticated || user === null){
            dispatch(setToast({message: "You must login first!", type: ERROR}))
            navigator('/admin');
        }    
    },  [isAuthenticated, user])
    
    return children;
}

export default AuthMidleware;