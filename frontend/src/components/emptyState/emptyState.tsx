"use client"

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon?: ReactNode
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  children?: ReactNode
  className?: string
}

export function EmptyState({
  icon,
  title = "No data available",
  description = "There’s nothing here yet.",
  actionLabel,
  onAction,
  children,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-10 rounded-xl border border-dashed",
        className
      )}
    >
      {/* Icon / Illustration */}
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}

      {/* Title */}
      <h2 className="text-xl font-semibold">{title}</h2>

      {/* Description */}
      <p className="text-sm text-muted-foreground mt-1 max-w-md">
        {description}
      </p>

      {/* Action button */}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-4">
          {actionLabel}
        </Button>
      )}

      {/* Custom children (forms, extra buttons, anything) */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}



/* 
Basic Empty State
<EmptyState />
*******************
With Icon + Custom Text
import { FolderOpen } from "lucide-react"

<EmptyState
  icon={<FolderOpen className="h-10 w-10" />}
  title="No Projects Found"
  description="Create your first project to get started."
/>
****************************************
With Action Button
<EmptyState
  title="No Tickets Yet"
  description="Tickets will appear here once created."
  actionLabel="Create Ticket"
  onAction={() => setOpen(true)}
/>
*****************************************
With Custom Children (Forms or Anything)
<EmptyState title="No Team Members">
  <Button variant="secondary">Invite Members</Button>
</EmptyState>

**********************************************
Left-aligned variant
<EmptyState
  className="items-start text-left"
  title="Nothing Here"
  description="Try adding something."
/>

*/ 