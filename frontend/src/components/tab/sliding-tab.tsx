"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRef, useEffect, useState } from "react";

export function SlidingTabs({
  tabs,
}: {
  tabs: { value: string; label: string }[];
}) {
  const [active, setActive] = useState(tabs[0].value);

  return (
    <TabsList
      className="
        relative w-full flex gap-1
         border-gray-200 
        bg-transparent
      "
    >
      {tabs.map((t) => (
        <TabsTrigger
          key={t.value}
          value={t.value}
          onClick={() => setActive(t.value)}
          className="
            relative px-5 pb-3 pt-2
            text-sm font-medium
            text-gray-600

            rounded-t-md
            transition-all

            data-[state=active]:text-black
            data-[state=active]:font-medium
            data-[state=active]:px-2 py-4

            data-[state=active]:shadow-[0_-1px_6px_rgba(0,0,0,0.10)]

            hover:text-gray-900
          "
        >
          {t.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
