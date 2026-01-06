
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

// "use client";

// import { Card } from "@/components/ui/card";
// import { Check } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function Stepper({
//   currentStep,
//   steps,
//   onStepClick,
//   canNavigateTo,
// }: {
//   currentStep: number;
//   steps: { id: number; name: string; icon: any }[];
//   onStepClick: (stepId: number) => void;
//   canNavigateTo?: (stepId: number) => boolean;
// }) {
//   return (
//     <Card className="p-4 w-full overflow-hidden">
//       <div className="mx-auto max-w-5xl">
//         <div className="flex items-center justify-between min-w-0">
//           {steps.map((s, index) => {
//             const Icon = s.icon;
//             const isActive = currentStep === s.id;
//             const isCompleted = currentStep > s.id;

//             const isClickable =
//               s.id !== currentStep &&
//               (!canNavigateTo || canNavigateTo(s.id));

//             return (
//               <div key={s.id} className="flex items-center min-w-0">
//                 {/* STEP */}
//                 <button
//                   type="button"
//                   disabled={!isClickable}
//                   onClick={() => isClickable && onStepClick(s.id)}
//                   className={cn(
//                     "flex flex-col items-center gap-2 shrink-0 focus:outline-none",
//                     isClickable
//                       ? "cursor-pointer"
//                       : "cursor-not-allowed opacity-60"
//                   )}
//                   title={
//                     !isClickable
//                       ? "Complete the current step first"
//                       : undefined
//                   }
//                 >
//                   {/* Circle */}
//                   <div
//                     className={cn(
//                       "h-10 w-10 flex items-center justify-center rounded-full border-2 transition-all",
//                       isCompleted || isActive
//                         ? "bg-black text-white border-black"
//                         : "border-gray-300 text-gray-400",
//                       isClickable &&
//                         "hover:ring-2 hover:ring-black/30"
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
//                 </button>

//                 {/* CONNECTOR */}
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

////////////////
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
    <div className="relative">
      {/* Progress Background Line */}
      <div className="absolute left-0 right-0 top-7 h-0.5 bg-gray-100 -translate-y-1/2" />
      
      {/* Progress Active Line */}
      <div 
        className="absolute left-0 top-7 h-0.5 bg-gray-900 -translate-y-1/2 transition-all duration-300"
        style={{ 
          width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          maxWidth: "calc(100% - 3rem)" 
        }}
      />

      <div className="relative flex items-center justify-between px-2">
        {steps.map((s, index) => {
          const Icon = s.icon;
          const isActive = currentStep === s.id;
          const isCompleted = currentStep > s.id;
          const isClickable =
            s.id !== currentStep &&
            (!canNavigateTo || canNavigateTo(s.id));

          return (
            <button
              key={s.id}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick(s.id)}
              className={cn(
                "relative flex flex-col items-center gap-3 z-10",
                "focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:ring-offset-2 rounded-lg p-2 transition-all",
                isClickable
                  ? "cursor-pointer hover:opacity-90"
                  : "cursor-not-allowed"
              )}
              title={
                !isClickable
                  ? "Complete the current step first"
                  : undefined
              }
            >
              {/* Step Circle */}
              <div
                className={cn(
                  "h-10 w-10 flex items-center justify-center rounded-full border-2 transition-all",
                  "shadow-sm",
                  isCompleted 
                    ? "bg-gray-900 text-white border-gray-900 shadow-gray-900/20"
                    : isActive
                    ? "bg-white text-gray-900 border-gray-900 shadow-gray-900/10"
                    : "bg-white text-gray-400 border-gray-200 shadow-gray-200",
                  isClickable && !isActive && !isCompleted && "hover:border-gray-300"
                )}
              >
                {isCompleted ? (
                  <Check size={16} />
                ) : (
                  <Icon size={16} />
                )}

              </div>

              {/* Step Label */}
              <div className="text-center">
                <div className={cn(
                  "text-xs font-medium mb-0.5",
                  isActive || isCompleted
                    ? "text-gray-900"
                    : "text-gray-500"
                )}>
                  Step {s.id}
                </div>
                <div className={cn(
                  "text-sm font-semibold whitespace-nowrap",
                  isActive || isCompleted
                    ? "text-gray-900"
                    : "text-gray-400"
                )}>
                  {s.name}
                </div>
              </div>

              {/* Connection Dots (mobile only) */}
              {index < steps.length - 1 && (
                <div className="lg:hidden md:hidden sm:flex absolute -right-4 top-5 items-center">
                  <div className="h-1 w-1 bg-gray-200 rounded-full mx-0.5" />
                  <div className="h-1 w-1 bg-gray-200 rounded-full mx-0.5" />
                  <div className="h-1 w-1 bg-gray-200 rounded-full mx-0.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile Progress Indicator */}
      <div className="sm:hidden mt-6 px-2">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Progress</span>
          <span>{currentStep} of {steps.length}</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
          <div 
            className="h-full bg-gray-900 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}