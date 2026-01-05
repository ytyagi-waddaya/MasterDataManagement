// import { Handle, Position } from "reactflow";
// import { Globe } from "lucide-react";
// import NodeCard from "./NodeCard";

// export default function DefinitionNode({ data }: any) {
//   return (
//     <div>
//       <NodeCard title="Workflow" icon={Globe} data={data}>
//         <div className="space-y-2 text-sm">
//           <div><b>Name:</b> {data.name}</div>
//           <div><b>Resource:</b> {data.resourceName}</div>
//         </div>
//       </NodeCard>

//       <Handle
//         type="source"
//         position={Position.Right}
//         className="bg-green-500! border-green-700! w-3! h-3!"
//       />
//     </div>
//   );
// }

import { Handle, Position, type NodeProps } from "reactflow";
import { Globe } from "lucide-react";
import NodeCard from "./NodeCard";

export default function DefinitionNode({ data }: NodeProps) {
  return (
    <div>
      <NodeCard title="Workflow" icon={Globe} data={data}>
        <div className="space-y-2 text-sm">
          <div>
            <b>Name:</b> {data?.name}
          </div>
          <div>
            <b>Resource:</b> {data?.resourceName}
          </div>
        </div>
      </NodeCard>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-green-500 !border-green-700 !w-3 !h-3"
      />
    </div>
  );
}

