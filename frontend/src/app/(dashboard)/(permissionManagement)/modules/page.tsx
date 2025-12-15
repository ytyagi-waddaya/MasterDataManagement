import ModulesTable from "@/lib/module/table/moduleTable";
import { ReactQueryProvider } from "@/lib/providers/ReactQueryProvider";

export default function ModulePage() {
  return (
    <ReactQueryProvider>
      <div className="pt-2 pl-2 pr-2 space-y-4">
        <header>
          <h1 className="text-2xl font-bold">Modules</h1>
          <p className="text-sm text-muted-foreground">
            Manage the application modules that define features and system functionalities.
          </p>
        </header>

        <main>
          <ModulesTable />
        </main>
      </div>
    </ReactQueryProvider>
  );
}
