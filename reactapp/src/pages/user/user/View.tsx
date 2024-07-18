import PageHeading from "../../../components/Breadcrumb";
import { breadcrumbElement } from "../../../constant/breadcrumb";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { pagination } from "../../../services/UserService";
import { useQuery } from "react-query";
import { LoadingSpinner } from "../../../components/ui/loading";
import Pagivate from "../../../components/Paginate";
import { useEffect, useState } from "react";
import useColumnState from "../../../hooks/useColumnState";
const UserPage: React.FC = () => {
    interface Users  {
        name: string,
        phone: string | null,
        image: string | null,
        address: string | null,
        birthday: string | null,
        created_at: string | null,
        description: string | null,
        district_id: string | null,
        email: string | null,
        email_verified_at: string | null,
        id: number,
        province_id: string | null,
        updated_at: string | null,
        ward_id: string | null,
    }
    
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1
    const [page, setPage] = useState<number | null>(currentPage);
    const {data, isLoading, isError, error, refetch} = useQuery(['users', page], () => pagination(page), {
        staleTime: 10000
    });


    const { columnState,handleChecked, setInitialColumnState } = useColumnState();
    const handlePagechange = (page:number | null) =>{
        setPage(page);
        navigate(`?page=${page}`)
    }
    
    
    useEffect(() =>{
        if(!isLoading && data.users){
            setInitialColumnState(data.users, 'publish')
        }
    }, [isLoading])
    useEffect(() =>{
        setSearchParams({ page: currentPage.toString() })
        refetch()
    }, [page, refetch])
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
                        <Table  className='border border-solid border-[#f3f3f3]'>
                            <TableHeader>
                                <TableRow>
                                <TableHead>
                                    <Checkbox />
                                </TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>User Name</TableHead>
                                <TableHead>Phone number</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>User Role</TableHead>
                                <TableHead className='text-center'>Status</TableHead>
                                <TableHead className='text-center'>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow >  
                                        <TableCell colSpan={9} className="font-medium text-center items-center">
                                            <LoadingSpinner className='inline-block'/>
                                        </TableCell>
                                    </TableRow>
                                ) : isError ? (
                                    <TableRow >  
                                        <TableCell colSpan={9} className="font-medium text-center items-center text-[#f00000]">     
                                            An error occurred, please try again - Error Code: {error.response.status}
                                        </TableCell>
                                    </TableRow>
                                )
                                 : data.users && data.users.map((user:Users) =>(
                                    <TableRow key={user.id}>  
                                    <TableCell className="font-medium"><Checkbox /></TableCell>
                                    <TableCell className="font-medium">{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.phone ?? '-'}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.address ?? '-'}</TableCell>
                                    <TableCell>Administrator</TableCell>
                                    <TableCell className="text-center">
                                        <Switch value={user.id} checked={columnState[user.id]?.publish} onCheckedChange={() => handleChecked(user.id, 'publish', 'users')} />
                                    </TableCell>
                                    <TableCell className="text-center flex justify-around">
                                        <Link to='/user/update' ><FaRegEdit className="text-2xl"/></Link>
                                        <Link to='/user/delete' ><MdDeleteOutline className="text-2xl text-[#ec4758]"/></Link>
                                    </TableCell>
                                    </TableRow>    
                                ))}
                                
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        {(!isLoading && data.links.length) ? <Pagivate links={data.links} pageChange={handlePagechange}/> : null}
                        
                    </CardFooter>
                </Card>
            </div>
            
        </>
    );
}

export default UserPage;
