import MasterObjectTable from "@/lib/masterObject/table/masterObjecctTable";

export default function MasterObjectPage() {
  return (
      <div className="pt-2 pl-2 pr-2 space-y-4">
        <header>
          <h1 className="text-2xl font-bold">Master Object</h1>
          <p className="text-sm text-muted-foreground">
            Manage Master Object 
          </p>
        </header>

        <main>
          <MasterObjectTable />
        </main>
      </div>
  );
}


