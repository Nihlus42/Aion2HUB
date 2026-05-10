import type { SourceStatus } from "./classes";

export type TimerScheduleType = "daily" | "weekly";
export type EventTimerIcon = "rift" | "daily" | "weekly" | "shugo";

export interface TimerSchedule {
  type: TimerScheduleType;
  hourUtc: number;
  minuteUtc: number;
  weekdayUtc?: number;
}

export interface EventTimerDefinition {
  id: string;
  title: string;
  description: string;
  icon: EventTimerIcon;
  schedule: TimerSchedule;
  sourceStatus: SourceStatus;
  lastUpdated?: string;
  sourceUrl?: string;
}

export const eventTimers: EventTimerDefinition[] = [
  {
    id: "rift-window",
    title: "Rift Window",
    description: "Placeholder: opens daily at 20:00 UTC.",
    icon: "rift",
    schedule: { type: "daily", hourUtc: 20, minuteUtc: 0 },
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "daily-reset",
    title: "Daily Reset",
    description: "Placeholder: resets daily at 09:00 UTC.",
    icon: "daily",
    schedule: { type: "daily", hourUtc: 9, minuteUtc: 0 },
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "weekly-reset",
    title: "Weekly Reset",
    description: "Placeholder: resets Wednesday at 09:00 UTC.",
    icon: "weekly",
    schedule: { type: "weekly", weekdayUtc: 3, hourUtc: 9, minuteUtc: 0 },
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "shugo-event",
    title: "Shugo Event",
    description: "Placeholder: starts Saturday at 18:00 UTC.",
    icon: "shugo",
    schedule: { type: "weekly", weekdayUtc: 6, hourUtc: 18, minuteUtc: 0 },
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
];
