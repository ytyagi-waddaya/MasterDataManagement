// "use client";

// import { Table } from "@tanstack/react-table";
// import { Button } from "@/components/ui/button";
// import { Settings2 } from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { useDispatch, useSelector } from "react-redux";
// import { setColumnVisibility } from "@/store/dataTableSlice";
// import { RootState } from "@/store";

// interface DataTableViewOptionsProps<TData> {
//   table: Table<TData>;
// }

// export function DataTableViewOptions<TData>({
//   table,
// }: DataTableViewOptionsProps<TData>) {
//   const dispatch = useDispatch();
//   const { columnVisibility } = useSelector(
//     (state: RootState) => state.dataTable
//   );

//   const handleToggle = (columnId: string, visible: boolean) => {
//     dispatch(
//       setColumnVisibility({
//         ...columnVisibility,
//         [columnId]: visible,
//       })
//     );
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="sm" className="ml-auto h-8">
//           <Settings2 className="mr-2 h-4 w-4" />
//           View
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent align="end" className="w-[200px]">
//         <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
//         <DropdownMenuSeparator />

//         {table
//           .getAllLeafColumns()
//           .filter((col) => col.id !== "actions" && col.id !== "select")
//           .map((col) => (
//             <DropdownMenuCheckboxItem
//               key={col.id}
//               checked={columnVisibility[col.id] ?? true}
//               onCheckedChange={(checked) => handleToggle(col.id, !!checked)}
//             >
//               {String(col.columnDef.header)}
//             </DropdownMenuCheckboxItem>
//           ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch, useSelector } from "react-redux";
import { setColumnVisibility } from "@/store/dataTableSlice";
import { RootState } from "@/store";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const dispatch = useDispatch();
  const { columnVisibility } = useSelector(
    (state: RootState) => state.dataTable
  );

  // Handle toggle with enableHiding check
  const handleToggle = (columnId: string, visible: boolean) => {
    const column = table.getColumn(columnId);
    if (column && column.columnDef.enableHiding === false) return; // Prevent hiding
    dispatch(
      setColumnVisibility({
        ...columnVisibility,
        [columnId]: visible,
      })
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8">
          <Settings2 className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {table
          .getAllLeafColumns()
          .filter((col) => col.id !== "actions" && col.id !== "select")
          .map((col) => (
            <DropdownMenuCheckboxItem
              key={col.id}
              checked={columnVisibility[col.id] ?? true}
              onCheckedChange={(checked) => handleToggle(col.id, !!checked)}
              disabled={col.columnDef.enableHiding === false} // Disable checkbox if hiding not allowed
            >
              {String(col.columnDef.header)}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
