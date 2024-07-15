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
import { Link } from "react-router-dom";
const UserPage: React.FC = () => {
    
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
                                <TableRow>  
                                <TableCell className="font-medium"><Checkbox /></TableCell>
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Tuong Tran</TableCell>
                                <TableCell>07000001234</TableCell>
                                <TableCell>testemail@gmail.com</TableCell>
                                <TableCell>Tachikawa Tokyo JpTachikawa Tokyo JpTachikawa Tokyo JpvTachikawa Tokyo JpTachikawa Tokyo JpTachikawa Tokyo JpTachikawa Tokyo JpTachikawa Tokyo JpTachikawa Tokyo JpTachikawa Tokyo JpTachikawa Tokyo JpTachikawa Tokyo JpTachikawa Tokyo JpTachikawa Tokyo JpTachikawa Tokyo JpTachikawa Tokyo JpTachikawa Tokyo JpTachikawa Tokyo JpTachikawa Tokyo Jp</TableCell>
                                <TableCell>Administrator</TableCell>
                                <TableCell className="text-center"><Switch/></TableCell>
                                <TableCell className="text-center flex justify-around">
                                    <Link to='/user/update' ><FaRegEdit className="text-2xl"/></Link>
                                    <Link to='/user/delete' ><MdDeleteOutline className="text-2xl text-[#ec4758]"/></Link>
                                </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
            </div>
            
        </>
    );
}

export default UserPage;
