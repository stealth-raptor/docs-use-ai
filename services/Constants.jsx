import { Calendar, LayoutDashboard, List, Settings, Wallet } from "lucide-react";

export const SidebarOptions=[
    {
        name:'Dashboard',
        icon:LayoutDashboard,
        path:'/dashboard'
    },
    {
        name:'Schedule an Interview',
        icon: Calendar,
        path:'/scheduled-interview'
    },
    {
        name:'All Interviews',
        icon:List,
        path:'/all-interview'
    },
    {
        name:'Payments',
        icon:Wallet,
        path:'/billing'
    },
    {
        name:'Settings',
        icon:Settings,
        path:'/settings'
    }
]