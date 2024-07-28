import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
type links = {
    url: string | null,
    label: string,
    active: boolean
}
interface PaginationProps {
    links: links[],
    pageChange: (page: number | null) => void
}

const Paginate:React.FC<PaginationProps> = ({links, pageChange}) =>{
    const activeLinkIndex = links.findIndex(link => link.active);
    const filterLinks = links.filter((link, index) => (
        (index !== 0 && 
        index !== links.length - 1) && 
        (index >= activeLinkIndex - 3 && index <= activeLinkIndex + 3 )
    ))

    return (
        <Pagination>
            <PaginationContent>
                {activeLinkIndex > 1 && (
                    <PaginationItem>
                        <PaginationPrevious 
                            href="" 
                            onClick={(e)=>{
                                e.preventDefault();
                                pageChange(parseInt(links[activeLinkIndex - 1].label));
                            }}
                        />
                    </PaginationItem>
                )}
                {filterLinks.map((link, index) =>(
                    <PaginationItem key={index}>
                        <PaginationLink 
                            href='' 
                            isActive={link.active ? true : false} 
                            dangerouslySetInnerHTML={{__html:link.label}}
                            onClick={(e)=>{
                                e.preventDefault();
                                pageChange(parseInt(link.label));
                            }}
                        />
                    </PaginationItem>    
                ))}
                {activeLinkIndex < links.length - 1 && (
                    <PaginationItem>
                        <PaginationNext 
                            href="" 
                            onClick={(e)=>{
                                e.preventDefault();
                                pageChange(parseInt(links[activeLinkIndex + 1].label));
                            }}
                        />
                    </PaginationItem>
                )}
                
            </PaginationContent>
        </Pagination>
    )
}

export default Paginate;
