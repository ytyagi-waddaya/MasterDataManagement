import { ReactQueryProvider } from "@/lib/providers/ReactQueryProvider";
import RolesTable from "@/lib/role/table/roleTable";

export default function RolesPage() {
  return (
    <ReactQueryProvider>
      <div className="pt-2 pl-2 pr-2 space-y-4">
        <header>
          <h1 className="text-2xl font-bold">Roles</h1>
          <p className="text-sm text-muted-foreground">
            Manage user roles and permissions across your organization
          </p>
        </header>

        <main>
          <RolesTable />
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
