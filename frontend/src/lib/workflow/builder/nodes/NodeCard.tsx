// import { MoreVertical } from "lucide-react";

// export default function NodeCard({ title, icon: Icon, data, children }: any) {
//   return (
//     <div className="relative w-[340px] rounded-xl border-2 border-green-500 bg-white shadow-md">
//       {/* HEADER (DRAG ONLY HERE) */}
//       <div className="flex items-center justify-between px-4 py-2 border-b drag-handle cursor-move">
//         <div className="flex items-center gap-2">
//           {Icon && <Icon className="h-4 w-4 text-green-600" />}
//           <span className="text-sm font-semibold">{title}</span>
//         </div>

//         {!data.readOnly && (
//           <button
//             type="button"
//             className="p-1 rounded hover:bg-slate-100"
//             onClick={(e) => {
//               e.stopPropagation();
//               data.onToggleMenu?.();
//             }}
//           >
//             <MoreVertical className="h-4 w-4 text-muted-foreground" />
//           </button>
//         )}
//       </div>

//       {/* MENU */}
//       {data.showMenu && (
//         <div
//           className="absolute right-2 top-10 w-32 rounded-md border bg-white shadow z-50"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <button
//             className="block w-full px-3 py-2 text-sm hover:bg-slate-100"
//             onClick={data.onDuplicate}
//           >
//             Duplicate
//           </button>
//           <button
//             className="block w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
//             onClick={data.onDelete}
//           >
//             Delete
//           </button>
//         </div>
//       )}

//       {/* BODY */}
//       <div className="px-4 py-3 bg-gray-100 rounded-b-xl">
//         {children}
//       </div>
//     </div>
//   );
// }


import { MoreVertical } from "lucide-react";

export default function NodeCard({ title, icon: Icon, data, children }: any) {
  return (
    <div className="relative w-[300px] rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
      
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-slate-50 drag-handle cursor-move rounded-t-xl">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-slate-600" />}
          <span className="text-sm font-medium text-slate-800">{title}</span>
        </div>

        {!data?.readOnly && (
          <button
            className="p-1 rounded hover:bg-slate-200"
            onClick={(e) => {
              e.stopPropagation();
              data.onToggleMenu?.();
            }}
          >
            <MoreVertical className="h-4 w-4 text-slate-500" />
          </button>
        )}
      </div>

      {/* MENU */}
      {data?.showMenu && (
        <div
          className="absolute right-2 top-10 z-50 w-32 rounded-lg border bg-white shadow"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="block w-full px-3 py-2 text-sm hover:bg-slate-100"
            onClick={data.onDuplicate}
          >
            Duplicate
          </button>
          <button
            className="block w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            onClick={data.onDelete}
          >
            Delete
          </button>
        </div>
      )}

      {/* BODY */}
      <div className="px-4 py-3 text-sm text-slate-700">
        {children}
      </div>
    </div>
  );
}
