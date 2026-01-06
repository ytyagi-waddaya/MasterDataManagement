// import { InspectorTab } from "./inspector.types";

// const TABS: InspectorTab[] = [
//   "GENERAL",
//   "VALIDATION",
//   "VISIBILITY",
//   "API",
// ];

// export function InspectorTabs({
//   active,
//   onChange,
// }: {
//   active: InspectorTab;
//   onChange: (tab: InspectorTab) => void;
// }) {
//   return (
//     <div className="flex border-b mb-3 text-xs">
//       {TABS.map((tab) => (
//         <button
//           key={tab}
//           onClick={() => onChange(tab)}
//           className={`px-3 py-2 border-b-2 ${
//             active === tab
//               ? "border-primary font-medium"
//               : "border-transparent text-muted-foreground"
//           }`}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>
//   );
// }

import { InspectorTab } from "./inspector.types";
import { Settings, Shield, Eye, Cpu } from "lucide-react";

const TABS: { id: InspectorTab; label: string; icon: React.ComponentType<any> }[] = [
  { id: "GENERAL", label: "General", icon: Settings },
  { id: "VALIDATION", label: "Validation", icon: Shield },
  { id: "VISIBILITY", label: "Visibility", icon: Eye },
  { id: "API", label: "API", icon: Cpu },
];

export function InspectorTabs({
  active,
  onChange,
}: {
  active: InspectorTab;
  onChange: (tab: InspectorTab) => void;
}) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              flex items-center gap-2 px-3 py-2 text-xs rounded-md transition-all duration-150
              ${isActive
                ? "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
              }
            `}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}