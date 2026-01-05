// import { Handle, Position } from "reactflow";
// import { GitBranch } from "lucide-react";
// import NodeCard from "./NodeCard";
// import { useEffect, useState } from "react";

// export default function StageNode({ data }: any) {
//   const [localName, setLocalName] = useState(data.name || "");

//   // Keep local state in sync
//   useEffect(() => {
//     setLocalName(data.name || "");
//   }, [data.name]);

//   return (
//     <div>
//       {/* TARGET HANDLE */}
//       <Handle
//         type="target"
//         position={Position.Left}
//         className="bg-blue-500! border-blue-700! w-3! h-3!"
//       />

//       <NodeCard title={localName} icon={GitBranch} data={data}>
//         {/* ❌ NO onClick HERE */}
//         <div className="space-y-1">
//           <label className="text-xs font-medium text-slate-700">
//             Stage Name <span className="text-red-500">*</span>
//           </label>

//           {data.readOnly ? (
//             <div className="rounded-md border bg-white px-3 py-2 text-sm">
//               {localName}
//             </div>
//           ) : (
//             <input
//               value={localName}
//               onChange={(e) => setLocalName(e.target.value)}
//               onBlur={() => data.onNameChange(localName)}
//               onClick={(e) => e.stopPropagation()}     // ✅ allow edit
//               onMouseDown={(e) => e.stopPropagation()} // ✅ prevent drag
//               className="nodrag nopan w-full rounded-md border px-3 py-2 text-sm
//                          focus:ring-2 focus:ring-green-500"
//             />
//           )}

//           <p className="text-[11px] text-slate-400">
//             eg: Draft, Review, Approval
//           </p>
//         </div>

//         {/* BADGES */}
//         <div className="flex gap-2 mt-3 text-xs">
//           <span className="rounded-full bg-slate-200 px-2 py-0.5">
//             {data.category}
//           </span>

//           {data.isInitial && (
//             <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">
//               Initial
//             </span>
//           )}

//           {data.isFinal && (
//             <span className="rounded-full bg-slate-200 px-2 py-0.5">
//               Final
//             </span>
//           )}
//         </div>
//       </NodeCard>

//       {/* SOURCE HANDLE */}
//       <Handle
//         type="source"
//         position={Position.Right}
//         className="bg-green-500! border-green-700! w-3! h-3!"
//         isConnectable={!data.isFinal}
//       />
//     </div>
//   );
// }



import { Handle, Position, type NodeProps } from "reactflow";
import { GitBranch } from "lucide-react";
import NodeCard from "./NodeCard";
import { useEffect, useState } from "react";

export default function StageNode({ data }: NodeProps) {
  const [localName, setLocalName] = useState(data?.name || "");

  useEffect(() => {
    setLocalName(data?.name || "");
  }, [data?.name]);

  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-blue-500 !border-blue-700 !w-3 !h-3"
      />

      <NodeCard title={localName} icon={GitBranch} data={data}>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">
            Stage Name <span className="text-red-500">*</span>
          </label>

          {data?.readOnly ? (
            <div className="rounded-md border bg-white px-3 py-2 text-sm">{localName}</div>
          ) : (
            <input
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              onBlur={() => data?.onNameChange?.(localName)}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              className="nodrag nopan w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
            />
          )}

          <p className="text-[11px] text-slate-400">eg: Draft, Review, Approval</p>
        </div>

        <div className="flex gap-2 mt-3 text-xs">
          <span className="rounded-full bg-slate-200 px-2 py-0.5">{data?.category}</span>

          {data?.isInitial && (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">Initial</span>
          )}

          {data?.isFinal && (
            <span className="rounded-full bg-slate-200 px-2 py-0.5">Final</span>
          )}
        </div>
      </NodeCard>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-green-500 !border-green-700 !w-3 !h-3"
        isConnectable={!data?.isFinal}
      />
    </div>
  );
}
