'use client';

import React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineIcon,
  TimelineContent,
  TimelineConnector,
  TimelineHeader,
} from './timeline';
import {
  Clock,
  CheckCircle,
  ArrowLeftRight,
  Send,
  User,
  FileText,
  AlertCircle,
  PlayCircle,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

// Types
interface Stage {
  id: string;
  name: string;
  code: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Transition {
  id: string;
  label: string;
  transitionType: string;
}

export interface HistoryItem {
  id: string;
  actionType: string;
  label: string | null;
  fromStage: Stage | null;
  toStage: Stage | null;
  performedBy: User;
  notes: string | null;
  createdAt: string;
  transition: Transition | null;
}

interface WorkflowTimelineProps {
  history: HistoryItem[];
  className?: string;
}

// Helper function to get icon based on action type
const getActionIcon = (actionType: string) => {
  switch (actionType) {
    case 'TRANSITION':
      return ArrowLeftRight;
    case 'SENT_BACK':
      return Send;
    case 'COMPLETED':
      return CheckCircle;
    case 'FAILED':
      return AlertCircle;
    case 'STARTED':
      return PlayCircle;
    default:
      return Clock;
  }
};

// Helper function to get icon variant based on action type
const getIconVariant = (actionType: string) => {
  switch (actionType) {
    case 'TRANSITION':
      return 'primary';
    case 'SENT_BACK':
      return 'warning';
    case 'COMPLETED':
      return 'success';
    case 'FAILED':
      return 'destructive';
    case 'STARTED':
      return 'success';
    default:
      return 'default';
  }
};

// Helper function to get readable action label
const getActionLabel = (item: HistoryItem) => {
  if (item.label) return item.label;
  
  switch (item.actionType) {
    case 'TRANSITION':
      return `Moved from ${item.fromStage?.name || 'unknown'} to ${item.toStage?.name || 'unknown'}`;
    case 'SENT_BACK':
      return `Sent back from ${item.fromStage?.name} to ${item.toStage?.name}`;
    default:
      return item.actionType.replace('_', ' ');
  }
};

export function WorkflowTimeline({ history, className }: WorkflowTimelineProps) {
  if (!history || history.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p>No history available</p>
      </div>
    );
  }

  // Sort history by date (newest first)
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className={className}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Workflow History</h3>
        <p className="text-sm text-gray-500 mt-1">Track all actions and transitions</p>
      </div>

      <Timeline>
        {sortedHistory.map((item, index) => {
          const Icon = getActionIcon(item.actionType);
          const variant = getIconVariant(item.actionType);
          const isLast = index === sortedHistory.length - 1;
          const date = new Date(item.createdAt);

          return (
            <TimelineItem key={item.id}>
              <TimelineIcon variant={variant}>
                <Icon className="h-5 w-5" />
              </TimelineIcon>
              {!isLast && <TimelineConnector />}
              
              <TimelineContent>
                <TimelineHeader>
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">
                      {getActionLabel(item)}
                    </p>
                    {item.transition?.label && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.transition.label}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    {formatDistanceToNow(date, { addSuffix: true })}
                  </div>
                </TimelineHeader>

                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">{item.performedBy.name}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-500">{item.performedBy.email}</span>
                  </div>

                  {item.fromStage && item.toStage && (
                    <div className="flex items-center text-sm">
                      <div className="flex items-center bg-gray-50 rounded-lg px-3 py-1.5">
                        <span className="text-gray-600 mr-2">From:</span>
                        <span className="font-medium text-gray-900">{item.fromStage.name}</span>
                        <ArrowLeftRight className="h-3 w-3 mx-2 text-gray-400" />
                        <span className="text-gray-600 mr-2">To:</span>
                        <span className="font-medium text-gray-900">{item.toStage.name}</span>
                      </div>
                    </div>
                  )}

                  {item.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start">
                        <FileText className="h-4 w-4 mr-2 mt-0.5 text-gray-400 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
                          <p className="text-sm text-gray-600">{item.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-500 mt-2">
                    {format(date, 'MMM dd, yyyy h:mm a')}
                  </div>
                </div>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </div>
  );
}