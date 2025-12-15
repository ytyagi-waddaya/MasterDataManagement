import ActionsTable from "@/lib/action/table/actionTable";
import { ReactQueryProvider } from "@/lib/providers/ReactQueryProvider";

export default function ActionPage() {
  return (
    <ReactQueryProvider>
      <div className="pt-2 pl-2 pr-2 space-y-4">
        <header>
          <h1 className="text-2xl font-bold">Actions</h1>
          <p className="text-sm text-muted-foreground">
            The specific operations a user can perform, such as creating, editing, or deleting resources
          </p>
        </header>

        <main>
          <ActionsTable/>
        </main>
      </div>
    </ReactQueryProvider>
  );
}
