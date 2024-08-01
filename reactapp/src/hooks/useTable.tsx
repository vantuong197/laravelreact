import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { pagination} from "@/services/UserService";
const useTable = () =>{
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParams = new URLSearchParams(searchParams.toString());
    const queryObject = {};
    for (const [key, value] of queryParams.entries()) {
      queryObject[key] = value;
    }
    
    const [filters, setFilters] = useState(queryObject);
    
    const [queryString, setQueryString] = useState<string>(() =>{
        const queryString = Object.keys(filters).filter(key => {
            const value = filters[key];
            return !(value === null || value === '' || value === 0 || value === undefined)
        }).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`).join('&')
        return queryString
    });
    const {data, isLoading, isError, refetch} = useQuery(['users', queryString], () => pagination(queryString));
    const {isProcessing} = useSelector((state: RootState) => state.processing);
    
    const handlePagechange = (page:number | null) =>{
        setFilters(prev =>({
            ...prev,
            'page': page
        }))
    }
    const handleQueryString = (value: string, field: string) =>{
        setFilters(prevVal => ({
            ...prevVal,
            [field]: value
        }))
    }
    
    useEffect(() =>{
        const queryString = Object.keys(filters).filter(key => {
            const value = filters[key];
            return !(value === null || value === '' || value === 0 || value === undefined)
        }).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`).join('&')
        setQueryString(`${queryString}`)
        navigate(`?${queryString}`)
        setSearchParams(filters)
        refetch()
    }, [filters, refetch, isProcessing])
    return {data, isLoading, isError, refetch, handlePagechange, handleQueryString, setFilters, filters}
}

export default useTable;
