// "use client"

// import { ChevronRight, type LucideIcon } from "lucide-react"

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuAction,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar"

// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string
//     url: string
//     icon: LucideIcon
//     isActive?: boolean
//     items?: {
//       title: string
//       url: string
//     }[]
//   }[]
// }) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Platform</SidebarGroupLabel>
//       <SidebarMenu>
//         {items.map((item) => (
//           <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
//             <SidebarMenuItem>
//               <SidebarMenuButton asChild tooltip={item.title}>
//                 <a href={item.url}>
//                   <item.icon />
//                   <span>{item.title}</span>
//                 </a>
//               </SidebarMenuButton>
//               {item.items?.length ? (
//                 <>
//                   <CollapsibleTrigger asChild>
//                     <SidebarMenuAction className="data-[state=open]:rotate-90">
//                       <ChevronRight />
//                       <span className="sr-only">Toggle</span>
//                     </SidebarMenuAction>
//                   </CollapsibleTrigger>
//                   <CollapsibleContent>
//                     <SidebarMenuSub>
//                       {item.items?.map((subItem) => (
//                         <SidebarMenuSubItem key={subItem.title}>
//                           <SidebarMenuSubButton asChild>
//                             <a href={subItem.url}>
//                               <span>{subItem.title}</span>
//                             </a>
//                           </SidebarMenuSubButton>
//                         </SidebarMenuSubItem>
//                       ))}
//                     </SidebarMenuSub>
//                   </CollapsibleContent>
//                 </>
//               ) : null}
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   )
// }
// "use client"

// import { ChevronRight, type LucideIcon } from "lucide-react"

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"

// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuAction,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar"

// /* -----------------------------
//    TYPES
// ----------------------------- */
// export type NavItem = {
//   title: string
//   icon?: LucideIcon
//   url?: string
//   items?: NavItem[]
// }

// /* -----------------------------
//    COMPONENT
// ----------------------------- */
// export function NavMain({ items }: { items: NavItem[] }) {
//   return (
//     <>
//       {items.map((category) => (
//         <Collapsible key={category.title} defaultOpen asChild>
//           <SidebarGroup className="py-0">
//             {/* Category Header */}
//             <SidebarGroupLabel
//               className="
//                 flex justify-between items-center
//                 py-1 px-2 text-sm font-medium
//               "
//             >
//               {category.title}

//               {!!category.items?.length && (
//                 <CollapsibleTrigger asChild>
//                   <button className="text-muted-foreground hover:text-foreground">
//                     <ChevronRight className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
//                   </button>
//                 </CollapsibleTrigger>
//               )}
//             </SidebarGroupLabel>

//             {/* Category Content */}
//             <CollapsibleContent>
//               <SidebarMenu className="py-0">
//                 {category.items?.map((module) => {
//                   const hasChildren = !!module.items?.length

//                   return (
//                     <Collapsible key={module.title} asChild>
//                       <SidebarMenuItem className="py-0">
//                         {/* Module Button */}
//                         <SidebarMenuButton asChild>
//                           <a href={module.url ?? "#"}>
//                             {module.icon && <module.icon />}
//                             <span>{module.title}</span>
//                           </a>
//                         </SidebarMenuButton>

//                         {/* Module Expand */}
//                         {hasChildren && (
//                           <>
//                             <CollapsibleTrigger asChild>
//                               <SidebarMenuAction className="data-[state=open]:rotate-90">
//                                 <ChevronRight />
//                               </SidebarMenuAction>
//                             </CollapsibleTrigger>

//                             <CollapsibleContent>
//                               <SidebarMenuSub className="ml-4">
//                                 {module.items?.map((resource) => (
//                                   <SidebarMenuSubItem key={resource.title}>
//                                     <SidebarMenuSubButton asChild>
//                                       <a href={resource.url ?? "#"}>
//                                         {resource.icon && <resource.icon />}
//                                         <span>{resource.title}</span>
//                                       </a>
//                                     </SidebarMenuSubButton>
//                                   </SidebarMenuSubItem>
//                                 ))}
//                               </SidebarMenuSub>
//                             </CollapsibleContent>
//                           </>
//                         )}
//                       </SidebarMenuItem>
//                     </Collapsible>
//                   )
//                 })}
//               </SidebarMenu>
//             </CollapsibleContent>
//           </SidebarGroup>
//         </Collapsible>
//       ))}
//     </>
//   )
// }

/////////////////////////////
// "use client";

// import { ChevronRight, type LucideIcon } from "lucide-react";
// import { usePathname } from "next/navigation";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";

// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuAction,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar";

// export type NavItem = {
//   title: string;
//   icon?: LucideIcon;
//   url?: string;
//   items?: NavItem[];
// };

// export function NavMain({ items }: { items: NavItem[] }) {
//   const pathname = usePathname();

//   // recursively check active route
//   const isActive = (item: NavItem): boolean => {
//     if (item.url && pathname.startsWith(item.url)) return true;
//     return item.items?.some(isActive) ?? false;
//   };

//   return (
//     <>
//       {items.map((category) => {
//         const categoryOpen = isActive(category);

//         return (
//           <Collapsible key={category.title} defaultOpen={categoryOpen} asChild>
//             <SidebarGroup className="py-0">
//               {/* Category Header */}
//               <SidebarGroupLabel
//                 className="
//                 flex justify-between items-center
//                  py-1 px-2 text-sm font-medium
//               "
//               >
//                 {category.title}

//                 {!!category.items?.length && (
//                   <CollapsibleTrigger asChild>
//                     <button>
//                       <ChevronRight className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
//                     </button>
//                   </CollapsibleTrigger>
//                 )}
//               </SidebarGroupLabel>

//               {/* Category Body */}
//               <CollapsibleContent>
//                 <SidebarMenu className="py-0">
//                   {category.items?.map((module) => {
//                     const moduleOpen = isActive(module);
//                     const hasChildren = !!module.items?.length;

//                     return (
//                       <Collapsible
//                         key={module.title}
//                         defaultOpen={moduleOpen}
//                         asChild
//                       >
//                         <SidebarMenuItem>
//                           <SidebarMenuButton asChild>
//                             <a href={module.url ?? "#"}>
//                               {module.icon && <module.icon />}
//                               <span>{module.title}</span>
//                             </a>
//                           </SidebarMenuButton>

//                           {hasChildren && (
//                             <>
//                               <CollapsibleTrigger asChild>
//                                 <SidebarMenuAction className="data-[state=open]:rotate-90">
//                                   <ChevronRight />
//                                 </SidebarMenuAction>
//                               </CollapsibleTrigger>

//                               <CollapsibleContent>
//                                 <SidebarMenuSub className="ml-4">
//                                   {module.items?.map((resource) => (
//                                     <SidebarMenuSubItem key={resource.title}>
//                                       <SidebarMenuSubButton asChild>
//                                         <a href={resource.url ?? "#"}>
//                                           {resource.icon && <resource.icon />}
//                                           <span>{resource.title}</span>
//                                         </a>
//                                       </SidebarMenuSubButton>
//                                     </SidebarMenuSubItem>
//                                   ))}
//                                 </SidebarMenuSub>
//                               </CollapsibleContent>
//                             </>
//                           )}
//                         </SidebarMenuItem>
//                       </Collapsible>
//                     );
//                   })}
//                 </SidebarMenu>
//               </CollapsibleContent>
//             </SidebarGroup>
//           </Collapsible>
//         );
//       })}
//     </>
//   );
// }


"use client";

import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export type NavItem = {
  title: string;
  icon?: LucideIcon;
  url?: string;
  items?: NavItem[];
};

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  const isActive = (item: NavItem): boolean => {
    if (item.url && pathname.startsWith(item.url)) return true;
    return item.items?.some(isActive) ?? false;
  };

  return (
    <>
      {items.map((category) => {
        const categoryOpen = isActive(category);

        return (
          <Collapsible key={category.title} defaultOpen={categoryOpen} asChild>
            <SidebarGroup className="py-0">
              {/* Category Header */}
              <SidebarGroupLabel className="flex justify-between items-center py-1 px-2 text-sm font-medium">
                {category.title}

                {!!category.items?.length && (
                  <CollapsibleTrigger asChild>
                    <button type="button">
                      <ChevronRight className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                    </button>
                  </CollapsibleTrigger>
                )}
              </SidebarGroupLabel>

              {/* Category Body */}
              <CollapsibleContent>
                <SidebarMenu className="py-0">
                  {category.items?.map((module) => {
                    const moduleOpen = isActive(module);
                    const hasChildren = !!module.items?.length;

                    return (
                      <Collapsible
                        key={module.title}
                        defaultOpen={moduleOpen}
                        asChild
                      >
                        <SidebarMenuItem>
                          {/* 🔥 MAIN FIX HERE */}
                          <SidebarMenuButton asChild>
                            {module.url ? (
                              <Link href={module.url}>
                                {module.icon && <module.icon />}
                                <span>{module.title}</span>
                              </Link>
                            ) : (
                              <div className="flex items-center gap-2">
                                {module.icon && <module.icon />}
                                <span>{module.title}</span>
                              </div>
                            )}
                          </SidebarMenuButton>

                          {hasChildren && (
                            <>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuAction className="data-[state=open]:rotate-90">
                                  <ChevronRight />
                                </SidebarMenuAction>
                              </CollapsibleTrigger>

                              <CollapsibleContent>
                                <SidebarMenuSub className="ml-4">
                                  {module.items?.map((resource) => (
                                    <SidebarMenuSubItem key={resource.title}>
                                      {/* 🔥 MAIN FIX HERE */}
                                      <SidebarMenuSubButton asChild>
                                        {resource.url ? (
                                          <Link href={resource.url}>
                                            {resource.icon && <resource.icon />}
                                            <span>{resource.title}</span>
                                          </Link>
                                        ) : (
                                          <span>{resource.title}</span>
                                        )}
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            </>
                          )}
                        </SidebarMenuItem>
                      </Collapsible>
                    );
                  })}
                </SidebarMenu>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        );
      })}
    </>
  );
}





