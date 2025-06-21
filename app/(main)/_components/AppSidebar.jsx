'use client'
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SidebarOptions } from '@/services/Constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function AppSidebar() {

    const path=usePathname();
    console.log(path);


  return (
    <Sidebar>      
      <SidebarHeader className='flex items-center mt-5'>
        <Image src="vercel.svg" width={200} height={100} className='w-[50px]' alt='logo'></Image>
        <Button className='w-full mt-5'>
            <Plus/>Create New Diagnosis
        </Button>
    </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarContent>
                <SidebarMenu className='mt-2.5'>
                    {SidebarOptions.map((option,index)=>(
                        
                        <SidebarMenuItem className='p-1 'key={index}>
                            <Link  className='flex items-center gap-2' href={option.path}>
                            <SidebarMenuButton className={`cursor-pointer p-5 ${path==option.path && 'bg-accent'}`}>
                                
                                <option.icon className='mr-1.5'/>
                                <span className='text-[15px]'>{option.name}</span>
                                
                            </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </SidebarGroup>
        </SidebarContent>
        <SidebarGroup />
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar