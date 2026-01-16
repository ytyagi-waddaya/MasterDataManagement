import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Timeline({ children, className, ...props }: TimelineProps) {
  return (
    <div className={cn("space-y-8", className)} {...props}>
      {children}
    </div>
  );
}

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  active?: boolean;
}

export function TimelineItem({ children, className, active = false, ...props }: TimelineItemProps) {
  return (
    <div className={cn("relative flex gap-4", className)} {...props}>
      {children}
    </div>
  );
}

interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive';
}

export function TimelineIcon({ children, className, variant = 'default', ...props }: TimelineIconProps) {
  const variantClasses = {
    default: "bg-gray-100 text-gray-600 border-gray-200",
    primary: "bg-blue-50 text-blue-600 border-blue-200",
    success: "bg-green-50 text-green-600 border-green-200",
    warning: "bg-yellow-50 text-yellow-600 border-yellow-200",
    destructive: "bg-red-50 text-red-600 border-red-200",
  };

  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TimelineContent({ children, className, ...props }: TimelineContentProps) {
  return (
    <div className={cn("flex-1 space-y-1 pb-8", className)} {...props}>
      {children}
    </div>
  );
}

interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export function TimelineConnector({ className, active = false, ...props }: TimelineConnectorProps) {
  return (
    <div
      className={cn(
        "absolute left-5 top-10 h-full w-0.5 -translate-x-1/2",
        active ? "bg-blue-200" : "bg-gray-200",
        className
      )}
      {...props}
    />
  );
}

interface TimelineHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TimelineHeader({ children, className, ...props }: TimelineHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between", className)} {...props}>
      {children}
    </div>
  );
}