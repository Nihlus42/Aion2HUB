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
    title: "Rift",
    description: "Provisoire : ouverture chaque jour a 20:00 UTC.",
    icon: "rift",
    schedule: { type: "daily", hourUtc: 20, minuteUtc: 0 },
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "daily-reset",
    title: "Reset quotidien",
    description: "Provisoire : reset chaque jour a 09:00 UTC.",
    icon: "daily",
    schedule: { type: "daily", hourUtc: 9, minuteUtc: 0 },
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "weekly-reset",
    title: "Reset hebdomadaire",
    description: "Provisoire : reset le mercredi a 09:00 UTC.",
    icon: "weekly",
    schedule: { type: "weekly", weekdayUtc: 3, hourUtc: 9, minuteUtc: 0 },
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "shugo-event",
    title: "Evenement Shugo",
    description: "Provisoire : debut le samedi a 18:00 UTC.",
    icon: "shugo",
    schedule: { type: "weekly", weekdayUtc: 6, hourUtc: 18, minuteUtc: 0 },
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
];
