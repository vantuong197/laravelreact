import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "./ui/loading";
import { useEffect } from "react";
import useColumnState from "@/hooks/useColumnState";
interface CustomizeTableProps {
    data: unknown,
    isLoading: boolean,
    isError: boolean
    model:string
    tableColumn: Array<{name:string; render: (item:any ) => JSX.Element}>
    actions: Array<{path:string; icon: any}>
    checkState: {[key:number] : boolean}
    checkAllState: boolean
    handleCheckChange: (id:number) =>void
    handleCheckAllChange: ()=> void
}
const CustomizeTable = ({
    isLoading, 
    data, 
    isError, 
    model, 
    tableColumn, 
    actions,
    checkState,
    checkAllState,
    handleCheckChange,
    handleCheckAllChange
    }:CustomizeTableProps) =>{
    const { columnState, handleChecked, setInitialColumnState } = useColumnState();
    useEffect(() =>{
        if(!isLoading && data[model]){
            setInitialColumnState(data[model], 'publish')
        }
    }, [isLoading, data])
    return (
        <Table  className='border border-solid border-[#f3f3f3]'>
            <TableHeader>
                <TableRow>
                <TableHead>
                    <Checkbox 
                        checked={checkAllState}
                        onCheckedChange={handleCheckAllChange}
                    />
                </TableHead>
                {tableColumn && tableColumn.map((item, index) => (
                    <TableHead key={index}>{item.name}</TableHead>
                ))}
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
                            An error occurred, please try again!
                        </TableCell>
                    </TableRow>
                )
                    : data[model] && data[model].map((record:any) =>(
                    <TableRow key={record.id} className={checkState[record.id] ? 'bg-[#ffc]' : null}>  
                        <TableCell className="font-medium">
                            <Checkbox checked={checkState[record.id]} onCheckedChange={() => handleCheckChange(record.id)}/>
                        </TableCell>
                            {tableColumn && tableColumn.map((item, index) => (
                                <TableCell key={index} className="font-medium">{item.render(record)}</TableCell>
                            ))}
                        <TableCell className="text-center">
                            <Switch value={record.id} checked={columnState[record.id]?.publish} onCheckedChange={() => handleChecked(record.id, 'publish', model)} className={columnState[record.id]?.publish ? "!bg-[#04AA6D]" : null}/>
                        </TableCell>
                        <TableCell className="text-center flex justify-around">
                            <Link to='/user/update' ></Link>
                            {actions && actions.map((item, index) =>(
                                <Link key={index} to={`${item.path}/${record.id}`} >{item.icon}</Link>
                            ))
                            }
                            
                        </TableCell>
                    </TableRow>    
                ))}
                
            </TableBody>
        </Table>
    )
}

export default CustomizeTable;