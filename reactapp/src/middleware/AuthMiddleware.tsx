import { PropsWithChildren, useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setToast } from "../redux/slice/toastSlice";
import { ERROR } from "../configs/globalVariable";
import { getUser } from '../services/AuthService';
import { setIsLogin } from '../redux/slice/authSlice';
type ProtectedRouteProps = PropsWithChildren;


const AuthMidleware = ({children}: ProtectedRouteProps) =>{
    const {isAuthenticated, user} = useSelector((state: RootState) => state.auth);
    const [checkAuth, setcheckAuth] = useState<boolean>(false);
    const navigator = useNavigate();
    const dispatch = useDispatch();
    useEffect(() =>{
        // console.log(isAuthenticated)
        const checkAuthenticated = async () =>{
            if(!isAuthenticated || user === null){
                const user = await getUser();
                if(user){
                    dispatch(setIsLogin(user))
                    
                }else{
                    dispatch(setToast({message: "You must login first!", type: ERROR}))
                    navigator('/admin');
                }
                
            }
            setcheckAuth(true);
        }
        checkAuthenticated();
    },  [])
    
    return checkAuth ? children : null;
}

export default AuthMidleware;