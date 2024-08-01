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
import { model, tableColumn,actions } from "@/services/UserService";
import Paginate from "@/components/Paginate";
import CustomizeTable from "@/components/CustomizeTable";
import Filter from "@/components/Filter";
import useCheckBoxState from "@/hooks/useCheckBoxState";
import useTable from "@/hooks/useTable";
const UserPage: React.FC = () => {
    const {data, isLoading, isError,  handlePagechange, handleQueryString, filters} = useTable();
    const {handleCheckChange, checkAllState, checkState, handleCheckAllChange, getIsAnyCheck} = useCheckBoxState(data, model);
    const isAnyChecked = getIsAnyCheck();
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
                            handleQueryString={handleQueryString}
                            filters={filters}
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
