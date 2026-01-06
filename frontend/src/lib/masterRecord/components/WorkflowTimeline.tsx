// import { useWorkflowHistory } from "@/lib/workflow/hooks";

// export function WorkflowTimeline({ instanceId }: { instanceId: string }) {
//   const { history } = useWorkflowHistory(instanceId);

//   return (
//     <div className="border rounded p-4">
//       <h3 className="font-semibold mb-2">Workflow History</h3>

//       <ul className="space-y-2 text-sm">
//         {history.map((h: any) => (
//           <li key={h.id}>
//             {h.actionType} → {h.toStage?.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
