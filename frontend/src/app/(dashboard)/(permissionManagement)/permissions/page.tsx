
import PermissionsTable from "@/lib/permission/table/permissionTable";
import { ReactQueryProvider } from "@/lib/providers/ReactQueryProvider";
import RolesTable from "@/lib/role/table/roleTable";

export default function PermissionsPage() {
  return (
    <ReactQueryProvider>
      <div className="pt-2 pl-2 pr-2 space-y-4">
        <header>
          <h1 className="text-2xl font-bold">Permissions</h1>
          <p className="text-sm text-muted-foreground">
            The combination of actions and resources that define what a role is allowed to do within your organization
          </p>
        </header>

        <main>
          <PermissionsTable />
        </main>
      </div>
    </ReactQueryProvider>
  );
}


// "use client";

// import { useRoles } from "@/lib/role/hooks/useRole";



// export default function RolePage() {
//   const { data, isLoading, error } = useRoles();

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching roles</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Roles JSON</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }
