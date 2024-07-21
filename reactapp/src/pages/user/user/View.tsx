import PageHeading from "@/components/Breadcrumb";
import { breadcrumbElement } from "@/constant/breadcrumb";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { pagination, model, tableColumn,actions } from "@/services/UserService";
import { useQuery } from "react-query";
import Paginate from "@/components/Paginate";
import { useEffect, useState } from "react";
import CustomizeTable from "@/components/CustomizeTable";
import Filter from "@/components/Filter";
import useCheckBoxState from "@/hooks/useCheckBoxState";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
const UserPage: React.FC = () => {
    
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1
    const [page, setPage] = useState<number | null>(currentPage);
    const {data, isLoading, isError, refetch} = useQuery(['users', page], () => pagination(page), {
        staleTime: 10000
    });
    const {handleCheckChange, checkAllState, checkState, handleCheckAllChange, getIsAnyCheck} = useCheckBoxState(data, model);
    const {isProcessing} = useSelector((state: RootState) => state.processing);
    
    const isAnyChecked = getIsAnyCheck();
    const handlePagechange = (page:number | null) =>{
        setPage(page);
        navigate(`?page=${page}`)
    }
    
    useEffect(() =>{
        setSearchParams({ page: currentPage.toString() })
        refetch()
    }, [page, refetch, isProcessing])
    return (
        <>
            <PageHeading breadcrumbProps={breadcrumbElement.Users}/>
            
            <div className="main-content__container">
                <Card className='rounded-[5px] mt-[15px]'>
                    <CardHeader className='border-b border-solid border-[#f3f3f3] p-[20px]'>
                        <CardTitle className='uppercase'>Users List</CardTitle>
                        <CardDescription className='text-xs text-[#f00000]'>Use the filter function to filter data</CardDescription>
                    </CardHeader>
                    <CardContent className='p-[15px]'>
                        <Filter 
                            isAnyChecked={isAnyChecked} 
                            checkState={checkState}
                            model={model}
                        />
                        <CustomizeTable 
                            isLoading={isLoading}
                            data={data}
                            isError={isError}
                            model={model}
                            tableColumn={tableColumn}
                            actions={actions}
                            checkState={checkState}
                            checkAllState={checkAllState}
                            handleCheckChange={handleCheckChange}
                            handleCheckAllChange={handleCheckAllChange}
                        />
                    </CardContent>
                    <CardFooter>
                        {(!isLoading && data.links.length) ? <Paginate links={data.links} pageChange={handlePagechange}/> : null}
                    </CardFooter>
                </Card>
            </div>
            
        </>
    );
}

export default UserPage;
