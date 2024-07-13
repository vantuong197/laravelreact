import React, { useEffect } from 'react';
import '../assets/scss/Accordion.scss'
import '../assets/scss/Aside.scss'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Link, useLocation } from 'react-router-dom';
import { sidebarItems } from '../constant/sidebar';
const Aside: React.FC = () =>{
    const location = useLocation();
    const segment = location.pathname.split('/')[1];
    const getOpenAccordionValue = () =>{
        for(let i = 0; i < sidebarItems.length; i++){
            const group = sidebarItems[i];
            for(let y = 0; y < group.items.length; y++){
                const item = group.items[y];
                if(item.active === segment){
                    return `item-${i}-${y}`
                }
            }
        }
    }
    const defaultValueOpen = getOpenAccordionValue();
    return (
        <aside className='app-aside w-60 h-full fixed bg-[#111c43]'>
            
            <div className="main-sidebar-header w-60 p-3.5 fixed z-10 h-14 text-center border-solid border-b border-menu-border text-[#a3aed1]">
                <a href="" className='inline-block'>
                    <img className='h-8' src="https://gogo-react.coloredstrategies.com/static/media/white-full.0fc3d8ac.svg" alt="" />
                </a>
            </div>

            <div className="main-sidebar mt-14 text-[#ffffff]">
                {sidebarItems && 
                
                sidebarItems.map((groupItems, groupIndex:number) =>(
                    <div key={groupIndex}>
                        <div className="menu-category px-6 py-6 tracking-wider font-semibold opacity-70">{groupItems.mainLabel}</div>
                        {
                            groupItems.items.map((item, index:number) =>(
                                <Accordion type="single" collapsible className="px-3 sidebar-accordion" key={index} defaultValue={defaultValueOpen}>
                                    <AccordionItem value={`item-${groupIndex}-${index}`} className="text-[#ffffff]">
                                        <AccordionTrigger className={`rounded-lg ${segment === item.active ? "bg-slate-500" : null}`}>
                                            <div className={`menu-label flex flex-1 items-center text-[#a3aed1] ${segment === item.active ? "text-[#ffffff]" : null}`}>
                                                {item.icon}
                                                <span>{item.label}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="border-0 mt-2">
                                            <ul>
                                                {
                                                    item.links.map((linkItems, linkItemsIndex:number) =>(
                                                        <li className='pl-6' key={linkItemsIndex}>
                                                            <Link 
                                                                to={linkItems.to} 
                                                                className='side-menu__item 
                                                                    block text-[#a3aed1] 
                                                                    text-12px relative 
                                                                    hover:text-white 
                                                                    rounded-lg 
                                                                    hover:bg-slate-500'>
                                                                {linkItems.title}
                                                                <span className='absolute 
                                                                    left-2 top-1/2 
                                                                    transform 
                                                                    -translate-y-1/2 
                                                                    w-1 h-1 
                                                                    border 
                                                                    border-solid 
                                                                    border-primary 
                                                                    rounded-full 
                                                                    border-white'></span>
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ))
                        }
                    </div>
                ))
                }
                
            </div>
        </aside>
    )
}
export default Aside;
