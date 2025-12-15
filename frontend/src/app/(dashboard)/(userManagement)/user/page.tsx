import { ReactQueryProvider } from "@/lib/providers/ReactQueryProvider";
import UsersTable from "@/lib/user/table/userTable";

export default function RolesPage() {
  return (
    <ReactQueryProvider>
      <div className="pt-2 pl-2 pr-2 space-y-4">
        <header>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage user roles and permissions across your organization
          </p>
        </header>

        <main>
          <UsersTable />
        </main>
      </div>
    </ReactQueryProvider>
  );
}