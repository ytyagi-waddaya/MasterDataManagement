"use client";

import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export function Stepper({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: { id: number; name: string; icon: any }[];
}) {
  return (
    <Card className="p-2 flex justify-center w-full ">
      <div className="flex items-center justify-center ">
        {steps.map((s, index) => {
          const Icon = s.icon;
          const isActive = currentStep === s.id;
          const isCompleted = currentStep > s.id;

          return (
            <div key={s.id} className="flex items-center">
              {/* Step + Label Wrapper */}
              <div className="flex flex-col items-center gap-2">
                {/* Circle */}
                <div
                  className={`
                    h-10 w-10 flex items-center justify-center rounded-full border-2 transition-all 
                    ${
                      isCompleted
                        ? "bg-black text-white"
                        : isActive
                        ? "bg-black text-white"
                        : "text-gray-400 border-gray-300"
                    }
                  `}
                >
                  {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                </div>

                {/* Step Name */}
                <span
                  className={`text-sm ${
                    isActive ? "text-slate-900" : "text-slate-500"
                  }`}
                >
                  {s.name}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="mx-1 h-0.5 w-64 bg-gray-200">
                  <div
                    className={`h-full bg-black transition-all ${
                      currentStep > s.id ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
