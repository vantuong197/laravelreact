import { createContext, useState, useContext, ReactNode } from "react";
import { SUCCESS, WARNING, ERROR } from "../configs/globalVariable";

export type ToastType = typeof SUCCESS | typeof WARNING | typeof ERROR | null;
interface ToastContextType {
    message: string,
    type: ToastType,
    setMessage: (message:string, type?: ToastType) => void
}

interface ToastProviderProps{
    children: ReactNode
}
const toastContext = createContext<ToastContextType | undefined>(undefined)


export const ToastProvider: React.FC<ToastProviderProps> = ({children}) =>{
    const [message, setToastMessage] = useState<string>('');
    const [type, setToastType] = useState<ToastType>(null);

    const setMessage = (message:string, type: ToastType = null) =>{
        setToastMessage(message);
        setToastType(type)
    }
    return (
        <toastContext.Provider value={{message, type, setMessage}}>
            {children}
        </toastContext.Provider>
    )
}


export const useToast =():ToastContextType =>{
    const context = useContext(toastContext);
    if(!context){
        throw new Error(
            'An unknown error has occurred!'
        )
    }
    return context;
}