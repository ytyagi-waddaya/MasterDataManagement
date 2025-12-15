import { AuthGate } from "@/components/AuthGate";
import NotificationBell from "@/components/notification/NotificationBell";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { UserNav } from "@/components/sidebar/user-nav";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <div className="flex items-center gap-4 px-4">
            <NotificationBell />
            <UserNav />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-2 pt-0 hide-scrollbar ">
          {/* <AuthGate> */}

          {children}
          {/* </AuthGate> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

// const { user } = useUser();

// useEffect(() => {
//   if (user?.id) initNotificationSocket(user.id);
// }, [user?.id]);
