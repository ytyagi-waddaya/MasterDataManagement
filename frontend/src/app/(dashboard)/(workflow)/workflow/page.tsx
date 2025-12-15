import WorkflowsTable from "@/lib/workflow/table/workflowTable";
export default function WorkflowsPage() {
  return (
      <div className="pt-2 pl-2 pr-2 space-y-4">
        <header>
          <h1 className="text-2xl font-bold">Workflows</h1>
          <p className="text-sm text-muted-foreground">
            Manage Workflow across your organization
          </p>
        </header>

        <main>
          <WorkflowsTable />
        </main>
      </div>
  );
}


