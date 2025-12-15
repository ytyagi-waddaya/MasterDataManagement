// "use client";

// export interface MasterObject {
//   id: string;
//   name: string;
//   key: string;
//   fields: Record<string, any>;

//   isActive: boolean;
//   isSystem: boolean;

//   createdAt: string;
//   updatedAt: string;
//   deletedAt?: string | null;
// }

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/store";
// import { DataTable } from "@/components/table/data-table";
// import { isActive, systemOptions } from "./filter";
// import { setTotal } from "@/store/dataTableSlice";
// import { useMasterObjects } from "../hook";
// import { masterObjectColumns } from "./column";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export default function MasterObjectTable() {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const { page, pageSize, search, sorting, filters } = useSelector(
//     (state: RootState) => state.dataTable
//   );

//   const sortColumn = sorting?.[0]?.id;
//   const sortOrder = sorting?.[0]?.desc ? "desc" : "asc";

//   const { data, isLoading } = useMasterObjects({
//     page,
//     limit: pageSize,
//     search,
//     filters,
//     sortBy: sortColumn,
//     sortOrder,
//   });
//   React.useEffect(() => {
//     if (data?.masterObjects) {
//       dispatch(setTotal(data.masterObjects.total));
//     }
//   }, [data?.masterObjects?.total, dispatch]);

//   const tableFilters = [
//     {
//       type: "single",
//       columnId: "isActive",
//       title: "Status",
//       options: isActive,
//     },
//     {
//       type: "single",
//       columnId: "isSystem",
//       title: "System Type",
//       options: systemOptions,
//     },
//     {
//       type: "date",
//       columnId: "createdAt",
//       title: "Created Date",
//     },
//   ];

//   return (
//     <DataTable
//       columns={masterObjectColumns}
//       data={data?.masterObjects?.data ?? []}
//       total={data?.masterObjects?.total ?? 0}
//       loading={isLoading}
//       page={page}
//       pageSize={pageSize}
//       sorting={sorting}
//       search={search}
//       filters={tableFilters}
//       createButton={
//         <Button
//           onClick={() => router.push("/create-master-object")}
//           className="ml-auto"
//         >
//           Add Master Object
//         </Button>
//       }
//     />
//   );
// }

"use client";

export interface MasterObject {
  id: string;
  name: string;
  key: string;
  fields: Record<string, any>;

  isActive: boolean;
  isSystem: boolean;

  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { DataTable } from "@/components/table/data-table";
import { isActive, systemOptions } from "./filter";
import { setTotal } from "@/store/dataTableSlice";
import { useMasterObjects } from "../hook";
import { masterObjectColumns } from "./column";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MasterObjectTable() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { page, pageSize, search, sorting, filters } = useSelector(
    (state: RootState) => state.dataTable
  );

  const sortColumn = sorting?.[0]?.id;
  const sortOrder = sorting?.[0]?.desc ? "desc" : "asc";

  const { data, isLoading } = useMasterObjects<MasterObject>({
    page,
    limit: pageSize,
    search,
    filters,
    sortBy: sortColumn,
    sortOrder,
  });

  React.useEffect(() => {
    if (data?.masterObjects?.total != null) {
      dispatch(setTotal(data.masterObjects.total));
    }
  }, [data?.masterObjects?.total, dispatch]);

  const tableFilters = [
    {
      type: "single",
      columnId: "isActive",
      title: "Status",
      options: isActive,
    },
    {
      type: "single",
      columnId: "isSystem",
      title: "System Type",
      options: systemOptions,
    },
    {
      type: "date",
      columnId: "createdAt",
      title: "Created Date",
    },
  ];

  return (
    <DataTable
      columns={masterObjectColumns}
      data={data?.masterObjects?.data ?? []}
      total={data?.masterObjects?.total ?? 0}
      loading={isLoading}
      page={page}
      pageSize={pageSize}
      sorting={sorting}
      search={search}
      filters={tableFilters}
    />
  );
}
