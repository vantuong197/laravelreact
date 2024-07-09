
import { useEffect } from "react";
import { useToast } from "../contexts/ToastContext";
import { showNotify } from "../helpers/Helper";
function DashboardPage() {
    const { message, type, setMessage } = useToast();
    useEffect(() =>{
        showNotify(message, type, setMessage)
    }, [])
    return <>Dashboard page</>;
}

export default DashboardPage;
