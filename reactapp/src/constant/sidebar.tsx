import { FaHome, FaUser } from "react-icons/fa";

export const sidebarItems = [
    {
        mainLabel: 'MAIN',
        items: [
            {
                icon: <FaHome className='text-sm mr-3'/>,
                active:'dashboard',
                label: 'Dashboard',
                links:[
                    {
                        title: 'Dashboard',
                        to: '/dashboard'
                    },
                    {
                        title: 'Order',
                        to: '/dashboard/order'
                    }
                ]
            }
        ]

    },
    {
        mainLabel: 'FUNCTION',
        items: [
            {
                icon: <FaUser className='text-sm mr-3'/>,
                active:'user',
                label: 'Users',
                links:[
                    {
                        title: 'Group Users',
                        to: '/user/catalogue/index'
                    },
                    {
                        title: 'Users',
                        to: '/user/index'
                    }
                ]
            }
        ]

    }
]