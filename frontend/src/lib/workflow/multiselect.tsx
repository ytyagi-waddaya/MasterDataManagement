// "use client";

// import * as React from "react";
// import { X } from "lucide-react";
// import { cn } from "@/lib/utils";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Command, CommandItem, CommandList, CommandInput, CommandGroup } from "@/components/ui/command";

// interface Option {
//   label: string;
//   value: string;
// }

// interface MultiSelectProps {
//   options: Option[];
//   selected: string[];
//   onChange: (values: string[]) => void;
//   placeholder?: string;
//   className?: string;
// }

// export function MultiSelect({
//   options,
//   selected,
//   onChange,
//   placeholder = "Select...",
//   className,
// }: MultiSelectProps) {
//   const [open, setOpen] = React.useState(false);

//   const toggleValue = (value: string) => {
//     if (selected.includes(value)) {
//       onChange(selected.filter((v) => v !== value));
//     } else {
//       onChange([...selected, value]);
//     }
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           className={cn(
//             "w-full justify-between flex flex-wrap gap-1 min-h-10",
//             className
//           )}
//         >
//           {selected.length === 0 && (
//             <span className="text-muted-foreground">{placeholder}</span>
//           )}

//           {selected.length > 0 && (
//             <div className="flex flex-wrap gap-1">
//               {selected.map((v) => {
//                 const option = options.find((o) => o.value === v);
//                 return (
//                   <Badge
//                     key={v}
//                     variant="secondary"
//                     className="flex items-center gap-1"
//                   >
//                     {option?.label}
//                     <X
//                       className="h-3 w-3 cursor-pointer"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleValue(v);
//                       }}
//                     />
//                   </Badge>
//                 );
//               })}
//             </div>
//           )}

//           <span className="ml-auto opacity-50">▾</span>
//         </Button>
//       </PopoverTrigger>

//       <PopoverContent className="p-0 w-full" align="start">
//         <Command>
//           <CommandInput placeholder="Search..." />

//           <CommandList>
//             <CommandGroup>
//               {options.map((option) => {
//                 const checked = selected.includes(option.value);
//                 return (
//                   <CommandItem
//                     key={option.value}
//                     onSelect={() => toggleValue(option.value)}
//                     className="cursor-pointer"
//                   >
//                     <div
//                       className={cn(
//                         "mr-2 flex h-4 w-4 items-center justify-center rounded border border-primary",
//                         checked ? "bg-primary text-white" : "opacity-30"
//                       )}
//                     >
//                       {checked && "✓"}
//                     </div>
//                     {option.label}
//                   </CommandItem>
//                 );
//               })}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }

// "use client";

// import * as React from "react";
// import { X } from "lucide-react";
// import { cn } from "@/lib/utils";

// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// import {
//   Command,
//   CommandItem,
//   CommandList,
//   CommandInput,
//   CommandGroup,
// } from "@/components/ui/command";

// interface Option {
//   id: string;      // updated to match backend objects
//   name: string;    // label shown in UI
// }

// interface MultiSelectProps {
//   options: Option[];
//   value: string[];               // selected IDs
//   onChange: (values: string[]) => void;
//   placeholder?: string;
//   className?: string;
// }

// export function MultiSelect({
//   options,
//   value,
//   onChange,
//   placeholder = "Select...",
//   className,
// }: MultiSelectProps) {
//   const [open, setOpen] = React.useState(false);

//   const toggleValue = (id: string) => {
//     if (value.includes(id)) {
//       onChange(value.filter((v) => v !== id));
//     } else {
//       onChange([...value, id]);
//     }
//   };

//   const getLabel = (id: string) =>
//     options.find((o) => o.id === id)?.name || id;

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           type="button"
//           variant="outline"
//           className={cn(
//             "w-full justify-between flex flex-wrap gap-1 min-h-10",
//             className
//           )}
//         >
//           {/* Placeholder */}
//           {value.length === 0 && (
//             <span className="text-muted-foreground">{placeholder}</span>
//           )}

//           {/* Selected values */}
//           {value.length > 0 && (
//             <div className="flex flex-wrap gap-1">
//               {value.map((id) => (
//                 <Badge
//                   key={id}
//                   variant="secondary"
//                   className="flex items-center gap-1"
//                 >
//                   {getLabel(id)}
//                   <X
//                     className="h-3 w-3 cursor-pointer"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleValue(id);
//                     }}
//                   />
//                 </Badge>
//               ))}
//             </div>
//           )}

//           <span className="ml-auto opacity-50">▾</span>
//         </Button>
//       </PopoverTrigger>

//       <PopoverContent className="p-0 w-full" align="start">
//         <Command>
//           <CommandInput placeholder="Search..." />

//           <CommandList>
//             <CommandGroup>
//               {options.map((option) => {
//                 const checked = value.includes(option.id);

//                 return (
//                   <CommandItem
//                     key={option.id}
//                     onSelect={() => toggleValue(option.id)}
//                     className="cursor-pointer"
//                   >
//                     <div
//                       className={cn(
//                         "mr-2 flex h-4 w-4 items-center justify-center rounded border border-primary",
//                         checked ? "bg-primary text-white" : "opacity-30"
//                       )}
//                     >
//                       {checked && "✓"}
//                     </div>

//                     {option.name}
//                   </CommandItem>
//                 );
//               })}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }

"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Command,
  CommandItem,
  CommandList,
  CommandInput,
  CommandGroup,
} from "@/components/ui/command";

interface RawOption {
  id?: string;
  name?: string;
  value?: string;     // backend alias
  label?: string;     // backend alias
}

interface NormalizedOption {
  id: string;
  name: string;
}

interface MultiSelectProps {
  options: RawOption[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  // Normalize options: support both {id, name} and {value, label}
  const normalized: NormalizedOption[] = React.useMemo(() => {
    return options.map((o) => ({
      id: o.id ?? o.value ?? "",
      name: o.name ?? o.label ?? "",
    }));
  }, [options]);

  const toggleValue = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const getLabel = (id: string) =>
    normalized.find((o) => o.id === id)?.name || id;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-between flex flex-wrap gap-1 min-h-10",
            className
          )}
        >
          {value.length === 0 && (
            <span className="text-muted-foreground">{placeholder}</span>
          )}

          {value.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {value.map((id) => (
                <Badge
                  key={id}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {getLabel(id)}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleValue(id);
                    }}
                  />
                </Badge>
              ))}
            </div>
          )}

          <span className="ml-auto opacity-50">▾</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-full" align="start">
        <Command>
          <CommandInput placeholder="Search..." />

          <CommandList>
            <CommandGroup>
              {normalized.map((option) => {
                const checked = value.includes(option.id);

                return (
                  <CommandItem
                    key={option.id}
                    onSelect={() => toggleValue(option.id)}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded border border-primary",
                        checked ? "bg-primary text-white" : "opacity-30"
                      )}
                    >
                      {checked && "✓"}
                    </div>

                    {option.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
