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
import LogoImage from "./LogoImage";

export function AppSidebar(props: any) {
  const user = useSelector(selectUser);
  const roles = useSelector(selectRoles);
  const { data: modules } = useModuleswithresources();
  const can = useCan();

  /* -----------------------------
     USER
  ------------------------------ */
  const sidebarUser = {
    id: user?.id ?? "",
    name: user?.name ?? "User",
    email: user?.email ?? "user@example.com",
    avatar:
      user?.attributes?.avatarUrl ?? "https://ui.shadcn.com/avatars/01.png",
  };

  /* -----------------------------
     RBAC HELPERS
  ------------------------------ */
  const isAdmin = roles?.some((r: any) => r.key === "ADMIN") ?? false;

  const canAccess = (permissionKey?: string) => {
    if (isAdmin) return true;
    if (!permissionKey) return false;
    return can.canByPermissionKey(permissionKey);
  };


  const filterMenu = (items: any[]) =>
    items
      .map((item) => {
        if (item.items?.length) {
          const visibleChildren = item.items.filter((c: any) =>
            canAccess(c.permissionKey)
          );
          if (!visibleChildren.length) return null;
          return { ...item, items: visibleChildren };
        }
        return canAccess(item.permissionKey) ? item : null;
      })
      .filter(Boolean);

  /* -----------------------------
     STATIC MENU
  ------------------------------ */
  const staticMenu = [
    {
      title: "Dashboard",
      items: filterMenu([
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
          permissionKey: "READ__DASHBOARD",
        },
      ]),
    },
    {
      title: "User & Security",
      items: filterMenu([
        {
          title: "User Administration",
          icon: UserCog,
          items: [{ title: "User", url: "/user", permissionKey: "READ__USER" }],
        },
        {
          title: "Role Administration",
          icon: IdCardLanyard,
          items: [
            { title: "Role", url: "/roles", permissionKey: "READ__ROLE" },
          ],
        },
        {
          title: "Authorization Engine",
          icon: Key,
          items: [
            { title: "Department", url: "/department", permissionKey: "READ__DEPARTMENT" },
            { title: "Modules", url: "/modules", permissionKey: "READ__MODULE" },
            {
              title: "Resources",
              url: "/resources",
              permissionKey: "READ__RESOURCE",
            },
            {
              title: "Actions",
              url: "/actions",
              permissionKey: "READ__ACTION",
            },
            {
              title: "Permissions",
              url: "/permissions",
              permissionKey: "READ__PERMISSION",
            },
          ],
        },
      ]),
    },
    {
      title: "Process Management",
      items: filterMenu([
        {
          title: "Workflows",
          url: "/workflow",
          icon: Workflow,
          permissionKey: "READ__WORKFLOW",
        },
      ]),
    },
    {
      title: "Data Dictionary",
      items: filterMenu([
        {
          title: "Resources Schemas",
          url: "/master-object",
          icon: Database,
          permissionKey: "READ__MASTER_OBJECT",
        },
        // {
        //   title: "Form Builder",
        //   url: "/form-builder",
        //   icon: Database,
        //   // permissionKey: "READ__MASTER_OBJECT",
        // },
      ]),
    },
  ].filter((section) => section.items.length > 0);

  /* -----------------------------
     DYNAMIC MODULES
  ------------------------------ */
  const normalizeKey = (v?: string | null) =>
    v
      ?.trim()
      .replace(/[\s-]+/g, "_")
      .replace(/[^A-Z0-9_]/gi, "")
      .toUpperCase() ?? "";

  const dynamicModulesMenu = {
    title: "Business Modules",
    items:
      modules
        ?.map((module: any) => {
          const resources =
            module.resources
              ?.filter((r: any) => {
                const key = normalizeKey(r.key ?? r.code ?? r.slug ?? r.name);
                return can.canByActionResource("READ", key);
              })
              .map((r: any) => ({
                title: r.name,
                url: `/resources/${r.id}`,
                icon: Folder,
              })) ?? [];

          if (!resources.length) return null;

          return {
            title: module.name,
            icon: Layers,
            items: resources,
          };
        })
        .filter(Boolean) ?? [],
  };

  const finalMenu = [...staticMenu, dynamicModulesMenu];

  /* -----------------------------
     RENDER
  ------------------------------ */
  return (
    <Sidebar variant="inset" {...props}>
      {/* ---------- HEADER ---------- */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* 🔥 NO <a href> HERE */}
            <SidebarMenuButton size="lg">
              <div className="flex items-center gap-2">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <LogoImage />
                </div>
                <div className="grid text-sm">
                  <span className="text-xl font-semibold tracking-wider bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    WADDAYA
                  </span>
                  {/* <span className="text-xs truncate">Enterprise</span> */}
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ---------- CONTENT ---------- */}
      <SidebarContent>
        <NavMain key={modules?.length ?? 0} items={finalMenu} />
      </SidebarContent>

      {/* ---------- FOOTER ---------- */}
      <SidebarFooter>
        <NavUser user={sidebarUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
