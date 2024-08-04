import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "react-router-dom"
interface breadcrumbProps {
    breadcrumbProps: {
        title: string,
        route: string
    }
}

const PageHeading: React.FC<breadcrumbProps> = ({breadcrumbProps}) =>{
    return (
        <>
            <div className="page-heading py-[20px] bg-white">
                <div className="px-[10px]">
                    <h2 className="text-[24px] font-semibold">
                        {breadcrumbProps.title}
                    </h2>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <Link to="/dashboard">DashBoard</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link to={breadcrumbProps.route}>{breadcrumbProps.title}</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
        </>
    )
}

export default PageHeading;