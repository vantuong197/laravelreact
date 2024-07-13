import { PropsWithChildren, useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getUser } from '../services/AuthService';
import { setIsLogin } from '../redux/slice/authSlice';
type ProtectedRouteProps = PropsWithChildren;


const LoginMiddleware = ({children}: ProtectedRouteProps) =>{
    const {isAuthenticated, user} = useSelector((state: RootState) => state.auth);
    
    const [checkAuth, setcheckAuth] = useState<boolean>(false);
    const navigator = useNavigate();
    const dispatch = useDispatch();
    useEffect(() =>{
        const checkAuthenticated = async () =>{
            if(!isAuthenticated || user === null){
                const user = await getUser();
                if(user){
                    dispatch(setIsLogin(user))
                    navigator('/dashboard');
                }
            }
            setcheckAuth(true);
        }
        checkAuthenticated();
    },  [])
    
    return checkAuth ? children : null;
}

export default LoginMiddleware;