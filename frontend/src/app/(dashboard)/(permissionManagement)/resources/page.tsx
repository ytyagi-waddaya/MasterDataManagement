import { ReactQueryProvider } from "@/lib/providers/ReactQueryProvider";
import ResourcesTable from "@/lib/resource/table/resourceTable";
import RolesTable from "@/lib/role/table/roleTable";

export default function ResourcesPage() {
  return (
    <ReactQueryProvider>
      <div className="pt-2 pl-2 pr-2 space-y-4">
        <header>
          <h1 className="text-2xl font-bold">Resources</h1>
          <p className="text-sm text-muted-foreground">
            The objects or areas in your system that actions apply to, like
            projects, tickets, or user accounts
          </p>
        </header>

        <main>
          <ResourcesTable />
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
