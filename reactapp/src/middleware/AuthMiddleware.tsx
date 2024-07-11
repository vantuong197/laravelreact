import { PropsWithChildren } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
type ProtectedRouteProps = PropsWithChildren;


const AuthMidleware = ({children}: ProtectedRouteProps) =>{
    const {isAuthenticated, user} = useSelector((state: RootState) => state.auth);
    if(!isAuthenticated || user === null){
        //redirect to login page here
    }
    return children;
}

export default AuthMidleware;