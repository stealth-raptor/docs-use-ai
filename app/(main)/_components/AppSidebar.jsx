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
import { Plus, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SidebarOptions } from '@/services/Constants'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from '@/app/provider'

function AppSidebar() {

  const path = usePathname();
  console.log(path);
  const router = useRouter();
  const { setTheme } = useTheme()
  const user = useUser();


  return (
    <Sidebar>

      <SidebarHeader className='flex  items-center mt-5'>
          <h2 width={50} height={100} alt='logo' className='font-bold text-2xl '>DoC.AI</h2>
          

        <Button className='w-full mt-5' onClick={() => router.push("/dashboard/create-diagnosis")}>
          <Plus />Create New Diagnosis
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu className='mt-2.5'>
              {SidebarOptions.map((option, index) => (

                <SidebarMenuItem className='p-1 ' key={index}>
                  <Link className='flex items-center gap-2' href={option.path}>
                    <SidebarMenuButton className={`cursor-pointer p-5 ${path == option.path && 'bg-accent'}`}>

                      <option.icon className='mr-1.5' />
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

    </Sidebar>
  )
}

export default AppSidebar