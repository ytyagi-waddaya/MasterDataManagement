
// "use client";

// import { Card } from "@/components/ui/card";
// import { Check } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function Stepper({
//   currentStep,
//   steps,
// }: {
//   currentStep: number;
//   steps: { id: number; name: string; icon: any }[];
// }) {
//   return (
//     <Card className="p-4 w-full overflow-hidden">
//       {/* Centered container */}
//       <div className="mx-auto max-w-5xl">
//         <div className="flex items-center justify-between min-w-0">
//           {steps.map((s, index) => {
//             const Icon = s.icon;
//             const isActive = currentStep === s.id;
//             const isCompleted = currentStep > s.id;

//             return (
//               <div key={s.id} className="flex items-center min-w-0">
//                 {/* Step */}
//                 <div className="flex flex-col items-center gap-2 shrink-0">
//                   {/* Circle */}
//                   <div
//                     className={cn(
//                       "h-10 w-10 flex items-center justify-center rounded-full border-2 transition-all",
//                       isCompleted || isActive
//                         ? "bg-black text-white border-black"
//                         : "border-gray-300 text-gray-400"
//                     )}
//                   >
//                     {isCompleted ? (
//                       <Check size={18} />
//                     ) : (
//                       <Icon size={18} />
//                     )}
//                   </div>

//                   {/* Label (hidden on very small screens) */}
//                   <span
//                     className={cn(
//                       "hidden sm:block text-sm whitespace-nowrap",
//                       isActive
//                         ? "text-slate-900 font-medium"
//                         : "text-slate-500"
//                     )}
//                   >
//                     {s.name}
//                   </span>
//                 </div>

//                 {/* Connector */}
//                 {index < steps.length - 1 && (
//                   <div className="flex-1 mx-2 sm:mx-6 h-0.5 bg-gray-200 min-w-6">
//                     <div
//                       className={cn(
//                         "h-full bg-black transition-all",
//                         currentStep > s.id ? "w-full" : "w-0"
//                       )}
//                     />
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </Card>
//   );
// }

"use client";

import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stepper({
  currentStep,
  steps,
  onStepClick,
  canNavigateTo,
}: {
  currentStep: number;
  steps: { id: number; name: string; icon: any }[];
  onStepClick: (stepId: number) => void;
  canNavigateTo?: (stepId: number) => boolean;
}) {
  return (
    <Card className="p-4 w-full overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between min-w-0">
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isActive = currentStep === s.id;
            const isCompleted = currentStep > s.id;

            const isClickable =
              s.id !== currentStep &&
              (!canNavigateTo || canNavigateTo(s.id));

            return (
              <div key={s.id} className="flex items-center min-w-0">
                {/* STEP */}
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick(s.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 shrink-0 focus:outline-none",
                    isClickable
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-60"
                  )}
                  title={
                    !isClickable
                      ? "Complete the current step first"
                      : undefined
                  }
                >
                  {/* Circle */}
                  <div
                    className={cn(
                      "h-10 w-10 flex items-center justify-center rounded-full border-2 transition-all",
                      isCompleted || isActive
                        ? "bg-black text-white border-black"
                        : "border-gray-300 text-gray-400",
                      isClickable &&
                        "hover:ring-2 hover:ring-black/30"
                    )}
                  >
                    {isCompleted ? (
                      <Check size={18} />
                    ) : (
                      <Icon size={18} />
                    )}
                  </div>

                  {/* Label (hidden on very small screens) */}
                  <span
                    className={cn(
                      "hidden sm:block text-sm whitespace-nowrap",
                      isActive
                        ? "text-slate-900 font-medium"
                        : "text-slate-500"
                    )}
                  >
                    {s.name}
                  </span>
                </button>

                {/* CONNECTOR */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-2 sm:mx-6 h-0.5 bg-gray-200 min-w-6">
                    <div
                      className={cn(
                        "h-full bg-black transition-all",
                        currentStep > s.id ? "w-full" : "w-0"
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
