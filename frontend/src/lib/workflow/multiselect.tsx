"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Badge } from "@/components/ui/badge";

import {
  Command,
  CommandItem,
  CommandList,
  CommandInput,
  CommandGroup,
} from "@/components/ui/command";

/* ======================================================
   TYPES
====================================================== */

interface RawOption {
  id?: string;
  name?: string;
  value?: string;
  label?: string;
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

/* ======================================================
   MULTI SELECT
====================================================== */

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  /* Normalize options safely */
  const normalized: NormalizedOption[] = React.useMemo(() => {
    return options
      .map((o) => ({
        id: o.id ?? o.value,
        name: o.name ?? o.label,
      }))
      .filter(
        (o): o is NormalizedOption =>
          Boolean(o.id && o.name)
      );
  }, [options]);

  const toggleValue = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const removeValue = (id: string) => {
    onChange(value.filter((v) => v !== id));
    setOpen(false);
  };

  const getLabel = (id: string) =>
    normalized.find((o) => o.id === id)?.name ?? id;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* ✅ NOT a button anymore */}
      <PopoverTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "flex min-h-10 w-full cursor-pointer flex-wrap items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            className
          )}
        >
          {/* Placeholder */}
          {value.length === 0 && (
            <span className="text-muted-foreground">
              {placeholder}
            </span>
          )}

          {/* Selected values */}
          {value.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {value.map((id) => (
                <Badge
                  key={id}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {getLabel(id)}

                  {/* ❌ Remove */}
                  <button
                    type="button"
                    className="ml-1 rounded-sm p-0.5 hover:bg-muted"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeValue(id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          <span className="ml-auto opacity-50">▾</span>
        </div>
      </PopoverTrigger>

      {/* Dropdown */}
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
                        checked
                          ? "bg-primary text-white"
                          : "opacity-30"
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
