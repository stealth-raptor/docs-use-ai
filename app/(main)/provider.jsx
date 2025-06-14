"use client"

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import AppSidebar from './_components/AppSidebar'

const DashboardProvider = ({children}) => {
  console.log("Dash provider Mounted");
  return (
    <SidebarProvider>
      <AppSidebar/>
      <div className='w-full'>
        <SidebarTrigger/>
          {children}
      </div>
    </SidebarProvider>
  )
}

export default DashboardProvider