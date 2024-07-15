import React, { useEffect } from 'react';
import { HiOutlineBars3CenterLeft } from 'react-icons/hi2';
import { IoIosSearch } from 'react-icons/io';
import { FiShoppingCart } from 'react-icons/fi';
import '../assets/scss/Header.scss'
import { Link } from 'react-router-dom';
import { GoBell } from 'react-icons/go';
import { IoGridOutline, IoSettingsOutline } from 'react-icons/io5';
import { BsFullscreenExit } from 'react-icons/bs';
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
const Header: React.FC = () =>{

    return (
        <header className='app-header h-14 fixed w-full content-center items-center top-0 bg-white absolute'>
            <div className="main-header mx-auto px-5 h-full flex items-center justify-between">
                <HiOutlineBars3CenterLeft className='text-4xl cursor-pointer'/>
                <div className="header-right-content flex justify-between items-center">
                    <div className="header-search ">
                        <Link to='/' className='header-link flex relative'>
                        <IoIosSearch className='header-link-icon text-4xl'/>
                        </Link>
                    </div>
                    
                    <div className="cart-dropdown">
                        <Link to='/' className='header-link flex relative '>
                            <FiShoppingCart className='header-link-icon'/>
                            <span className='badge absolute top-[5px] right-[10px] text-[#922c88] w-[17px] h-[15px] text-center text-[9px] border rounded-[10px] border-fuchsia-900'>5</span>
                        </Link>
                    </div>

                    <div className="notification-dropdown">
                        <Link to='/' className='header-link flex relative'>
                            <GoBell className='header-link-icon'/>
                            <span className='badge absolute top-[5px] right-[10px] text-[#922c88] w-[17px] h-[15px] text-center text-[9px] border rounded-[10px] border-fuchsia-900'>5</span>
                        </Link>
                    </div>

                    <div className="shortcut-dropdown">
                        <Link to='/' className='header-link flex'>
                            <IoGridOutline className='header-link-icon'/>
                        </Link>
                    </div>

                    <div className="fullscreen">
                        <Link to='/' className='header-link flex'>
                            <BsFullscreenExit className='header-link-icon'/>
                        </Link>
                    </div>
                    <div className="profile">
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex'>
                            <Avatar className='mr-3'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="profile-content text-left">
                                <div className="font-semibold">Tuong Tran</div>
                                <div className="role text-[#536485]">Administrator</div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='flex items-center text-[15px] cursor-pointer'>
                                <CgProfile className='mr-2'/>
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className='flex items-center text-[15px] cursor-pointer'>
                                <IoSettingsOutline className='mr-2'/>
                                Setting
                            </DropdownMenuItem>
                            <DropdownMenuItem className='flex items-center text-[15px] cursor-pointer'>
                                <HiOutlineLogout className='mr-2'/>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                </div>
            </div>

        </header>
    )
}
export default Header;
