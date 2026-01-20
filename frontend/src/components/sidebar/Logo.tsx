import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import AuthImage from './LogoImage'

export function Logo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                <AuthImage/>
              </div>
               <span className="text-xl font-bold tracking-wider bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                WONE ITSM
                </span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}


        // <SidebarMenu>
        //   <SidebarMenuItem>
        //     {/* 🔥 NO <a href> HERE */}
        //     <SidebarMenuButton size="lg">
        //       <div className="flex items-center gap-2">
        //         <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        //           <LayoutDashboard className="size-4" />
        //         </div>
        //         <div className="grid text-sm">
        //           <span className="font-medium truncate">Acme Inc</span>
        //           <span className="text-xs truncate">Enterprise</span>
        //         </div>
        //       </div>
              
        //     </SidebarMenuButton>
        //   </SidebarMenuItem>
        // </SidebarMenu>