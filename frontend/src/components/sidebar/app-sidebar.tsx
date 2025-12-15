// "use client";

// import * as React from "react";
// import {
//   BookOpen,
//   Command,
//   Database,
//   Folder,
//   Frame,
//   IdCardLanyard,
//   Key,
//   Layers,
//   LayoutDashboard,
//   LifeBuoy,
//   Map,
//   PieChart,
//   Send,
//   Settings2,
//   UserCog,
//   Workflow,
// } from "lucide-react";

// import { NavMain } from "@/components/sidebar/nav-main";
// import { NavProjects } from "@/components/sidebar/nav-projects";
// import { NavSecondary } from "@/components/sidebar/nav-secondary";
// import { NavUser } from "@/components/sidebar/nav-user";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import { useSelector } from "react-redux";
// import { selectUser } from "@/store/auth";
// import {useModuleswithresources } from "@/lib/module/hook";

// const data = {
//   navMain: [
//     {
//       title: "Dashboard",
//       url: "/dashboard",
//       icon: LayoutDashboard,
//       isActive: true,
//     },
//     {
//       title: "User Management",
//       url: "#",
//       icon: UserCog,
//       isActive: true,
//       items: [
//         {
//           title: "User",
//           url: "/user",
//         },
//       ],
//     },
//     {
//       title: "Role Management",
//       url: "#",
//       icon: IdCardLanyard,
//       items: [
//         {
//           title: "Role",
//           url: "/roles",
//         },
//       ],
//     },
//     {
//       title: "Permission Management",
//       url: "#",
//       icon: Key,
//       items: [
//         {
//           title: "Module",
//           url: "/modules",
//         },
//         {
//           title: "Resource",
//           url: "/resources",
//         },
//         {
//           title: "Action",
//           url: "/actions",
//         },
//         {
//           title: "Permission",
//           url: "/permissions",
//         },
//       ],
//     },
//     {
//       title: "Workflow",
//       url: "/workflow",
//       icon: Workflow,
//       isActive: true,
//     },
//     {
//       title: "MasterObject",
//       url: "/master-object",
//       icon: Database,
//       isActive: true,
//     },
//     // {
//     //   title: "Documentation",
//     //   url: "#",
//     //   icon: BookOpen,
//     //   items: [
//     //     {
//     //       title: "Introduction",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Get Started",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Tutorials",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Changelog",
//     //       url: "#",
//     //     },
//     //   ],
//     // },
//     // {
//     //   title: "Settings",
//     //   url: "#",
//     //   icon: Settings2,
//     //   items: [
//     //     {
//     //       title: "General",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Team",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Billing",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Limits",
//     //       url: "#",
//     //     },
//     //   ],
//     // },
//   ],
//   navSecondary: [
//     {
//       title: "Support",
//       url: "#",
//       icon: LifeBuoy,
//     },
//     {
//       title: "Feedback",
//       url: "#",
//       icon: Send,
//     },
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
// };

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const user = useSelector(selectUser);
//  const { data: modules, isLoading } = useModuleswithresources();
//   const sidebarUser = {
//     name: user?.name ?? "User",
//     email: user?.email ?? "user@example.com",
//     avatar:
//       user?.attributes?.avatarUrl ?? "https://ui.shadcn.com/avatars/01.png",
//   };

//     const dynamicMenu =
//     modules?.map((module:any) => ({
//       title: module.name,
//       icon: Layers,
//       url: undefined,
//       items: module.resources.map((resource:any) => ({
//         title: resource.name,
//         icon: Folder,
//         url: `/resources/${resource.id}`, 
//       })),
//     })) ?? [];

//   return (
//     <Sidebar variant="inset" {...props}>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <a href="#">
//                 <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
//                   <Command className="size-4" />
//                 </div>
//                 <div className="grid flex-1 text-left text-sm leading-tight">
//                   <span className="truncate font-medium">Acme Inc</span>
//                   <span className="truncate text-xs">Enterprise</span>
//                 </div>
//               </a>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent>
//         {/* <NavMain items={data.navMain} /> */}
//         <NavMain items={[...data.navMain, ...dynamicMenu]} />
//         <NavProjects projects={data.projects} />
//         <NavSecondary items={data.navSecondary} className="mt-auto" />
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={sidebarUser} />
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

// "use client"

// import * as React from "react"
// import {
//   Database,
//   Folder,
//   IdCardLanyard,
//   Key,
//   LayoutDashboard,
//   UserCog,
//   Workflow,
//   Layers
// } from "lucide-react"

// import { NavMain } from "@/components/sidebar/nav-main"
// import { NavProjects } from "@/components/sidebar/nav-projects"
// import { NavSecondary } from "@/components/sidebar/nav-secondary"
// import { NavUser } from "@/components/sidebar/nav-user"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"
// import { useSelector } from "react-redux"
// import { selectUser } from "@/store/auth"
// import { useModuleswithresources } from "@/lib/module/hook"
// import useCan from "@/store/auth/useCan"

// export function AppSidebar({ ...props }) {
//   const user = useSelector(selectUser)
//   const { data: modules } = useModuleswithresources()

//   const sidebarUser = {
//     name: user?.name ?? "User",
//     email: user?.email ?? "user@example.com",
//     avatar: user?.attributes?.avatarUrl ?? "https://ui.shadcn.com/avatars/01.png",
//   }

//   // ----------------------
//   // STATIC MENU (Grouped)
//   // ----------------------
//   const staticMenu = [
//     {
//       title: "Home",
//       items: [
//         {
//           title: "Dashboard",
//           url: "/dashboard",
//           icon: LayoutDashboard,
//         },
//       ],
//     },
//     {
//       title: "Access Control",
//       items: [
//         {
//           title: "User Management",
//           icon: UserCog,
//           url: "#",
//           items: [{ title: "User", url: "/user" }],
//         },
//         {
//           title: "Role Management",
//           icon: IdCardLanyard,
//           url: "#",
//           items: [{ title: "Role", url: "/roles" }],
//         },
//         {
//           title: "Permission Management",
//           icon: Key,
//           url: "#",
//           items: [
//             { title: "Module", url: "/modules" },
//             { title: "Resource", url: "/resources" },
//             { title: "Action", url: "/actions" },
//             { title: "Permission", url: "/permissions" },
//           ],
//         },
//       ],
//     },
//     {
//       title: "Automation",
//       items: [
//         {
//           title: "Workflow",
//           url: "/workflow",
//           icon: Workflow,
//         },
//       ],
//     },
//     {
//       title: "Data Modeling",
//       items: [
//         {
//           title: "MasterObject",
//           url: "/master-object",
//           icon: Database,
//         },
//       ],
//     },
//   ]

//   // ----------------------
//   // DYNAMIC MODULES
//   // ----------------------

// const dynamicModulesMenu = {
//   title: "Modules",
//   items: modules?.map((module: any) => ({
//     title: module.name,
//     url: "#",
//     icon: Layers,
//     items: module.resources?.map((resource: any) => ({
//       title: resource.name,
//       url: `/resources/${resource.id}`,
//       icon: Folder,
//     })) ?? [],
//   })) ?? [],
// };


//   // FINAL MENU
//   const finalMenu = [...staticMenu, dynamicModulesMenu]

//   return (
//     <Sidebar variant="inset" {...props}>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <a href="#">
//                 <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
//                   <LayoutDashboard className="size-4" />
//                 </div>
//                 <div className="grid text-sm">
//                   <span className="font-medium truncate">Acme Inc</span>
//                   <span className="text-xs truncate">Enterprise</span>
//                 </div>
//               </a>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>

//       <SidebarContent>
//         <NavMain items={finalMenu} />
//         {/* <NavProjects projects={[]} />
//         <NavSecondary items={[]} className="mt-auto" /> */}
//       </SidebarContent>

//       <SidebarFooter>
//         <NavUser user={sidebarUser} />
//       </SidebarFooter>
//     </Sidebar>
//   )
// }
"use client";

import {
  Database,
  Folder,
  IdCardLanyard,
  Key,
  LayoutDashboard,
  UserCog,
  Workflow,
  Layers,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useSelector } from "react-redux";
import { selectRoles, selectUser } from "@/store/auth";
import { useModuleswithresources } from "@/lib/module/hook";
import useCan from "@/store/auth/useCan";

export function AppSidebar(props: any) {
  const user = useSelector(selectUser);
  const role = useSelector(selectRoles);
  const { data: modules } = useModuleswithresources();
  const can = useCan();


  const sidebarUser = {
    id:user?.id ?? "",
    name: user?.name ?? "User",
    email: user?.email ?? "user@example.com",
    avatar: user?.attributes?.avatarUrl ?? "https://ui.shadcn.com/avatars/01.png",
  };


/* -----------------------------
    STATIC MENU (RBAC Based)
------------------------------ */

// RBAC helper
const isAdmin = role?.some((r: any) => r.key === "ADMIN") ?? false;

console.log("ISADMIN:", isAdmin);


const canAccessStatic = (permissionKey: string) => {
  if (isAdmin) return true; // admin sees everything
  if (!permissionKey) return false;
  return can.canByPermissionKey(permissionKey);
};

const filterMenuByPermission = (items: any[]): any[] =>
  items
    .map((item) => {
      // Case 1: Parent with children
      if (item.items?.length) {
        const visibleChildren = item.items.filter((child: any) =>
          canAccessStatic(child.permissionKey)
        );

        // Hide parent if no visible children
        if (visibleChildren.length === 0) return null;

        return {
          ...item,
          items: visibleChildren,
        };
      }

      // Case 2: Leaf item
      if (!item.permissionKey) return null;

      return canAccessStatic(item.permissionKey) ? item : null;
    })
    .filter(Boolean);


const staticMenu = [
  {
    title: "Home",
    items: filterMenuByPermission([
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        permissionKey: "READ__DASHBOARD",
      },
    ]),
  },

  {
    title: "Access Control",
    items: filterMenuByPermission([
      {
        title: "User Management",
        icon: UserCog,
        url: "#",
        items: [
          { title: "User", url: "/user", permissionKey: "READ__USER" },
        ],
      },
      {
        title: "Role Management",
        icon: IdCardLanyard,
        url: "#",
        items: [
          { title: "Role", url: "/roles", permissionKey: "READ__ROLE" },
        ],
      },
      {
        title: "Permission Management",
        icon: Key,
        url: "#",
        items: [
          { title: "Module", url: "/modules", permissionKey: "READ__MODULE" },
          { title: "Resource", url: "/resources", permissionKey: "READ__RESOURCE" },
          { title: "Action", url: "/actions", permissionKey: "READ__ACTION" },
          { title: "Permission", url: "/permissions", permissionKey: "READ__PERMISSION" },
        ],
      },
    ]),
  },

  {
    title: "Automation",
    items: filterMenuByPermission([
      {
        title: "Workflow",
        url: "/workflow",
        icon: Workflow,
        permissionKey: "READ__WORKFLOW",
      },
    ]),
  },

  {
    title: "Data Modeling",
    items: filterMenuByPermission([
      {
        title: "MasterObject",
        url: "/master-object",
        icon: Database,
        permissionKey: "READ__MASTER_OBJECT",
      },
    ]),
  },
].filter((section) => section.items.length > 0);


  /* -----------------------------
      DYNAMIC MODULES (RBAC Filtered)
  ------------------------------ */
const normalizeKey = (v?: string | null): string => {
  if (!v) return "";
  return v
    .trim()
    .replace(/[\s-]+/g, "_")  // spaces & dashes → underscore
    .replace(/[^A-Z0-9_]/gi, "") // remove weird characters
    .toUpperCase();
};

const dynamicModulesMenu = {
  title: "Modules",
  items:
    modules
      ?.map((module: any) => {
        const visibleResources =
          module.resources
            ?.filter((resource: any) => {
               const rawKey = resource.key ?? resource.code ?? resource.slug ?? resource.name;
              const key = normalizeKey(resource.key);

              console.log(
                "RESOURCE:", rawKey,
                "normalized:", key,
                "permission:", can.canByActionResource("READ", key)
              );

              return can.canByActionResource("READ", key);
            })
            .map((resource: any) => ({
              title: resource.name,
              url: `/resources/${resource.id}`,
              icon: Folder,
            })) ?? [];

        if (visibleResources.length === 0) return null;

        return {
          title: module.name,
          icon: Layers,
          url: "#",
          items: visibleResources,
        };
      })
      .filter(Boolean) ?? [],
};



  const finalMenu = [...staticMenu, dynamicModulesMenu];

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <LayoutDashboard className="size-4" />
                </div>
                <div className="grid text-sm">
                  <span className="font-medium truncate">Acme Inc</span>
                  <span className="text-xs truncate">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={finalMenu} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={sidebarUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
