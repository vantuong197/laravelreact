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
                        title: '総合管理',
                        to: '/dashboard'
                    },
                    {
                        title: '注文管理',
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
                        title: 'グループユーザ管理',
                        to: '/user/catalogue'
                    },
                    {
                        title: 'ユーザ管理',
                        to: '/user'
                    }
                ]
            }
        ]

    }
]