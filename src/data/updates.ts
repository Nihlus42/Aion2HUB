import type { SourceStatus } from "./classes";

export type UpdateCategory = "Patch Notes" | "News" | "Events" | "Maintenance";
export type UpdateRegion = "KR" | "Global" | "EU";

export interface UpdateEntry {
  id: string;
  title: string;
  summary: string;
  category: UpdateCategory;
  region: UpdateRegion;
  sourceStatus: SourceStatus;
  lastUpdated: string;
  sourceUrl?: string;
}

export const updates: UpdateEntry[] = [
  {
    id: "u1",
    title: "Version 0.9.3 Preview Notes",
    summary: "Placeholder patch note set covering class balance and dungeon tuning.",
    category: "Patch Notes",
    region: "KR",
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "u2",
    title: "Global Service Window Outlook",
    summary: "Placeholder news post for roadmap communication and regional rollout timing.",
    category: "News",
    region: "Global",
    sourceStatus: "expected",
    lastUpdated: "2026-05-10",
    sourceUrl: "https://example.com/global-news-placeholder",
  },
  {
    id: "u3",
    title: "Weekend Boost Event Draft",
    summary: "Placeholder event block for bonus XP and drop-rate multipliers.",
    category: "Events",
    region: "EU",
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "u4",
    title: "Scheduled Infrastructure Maintenance",
    summary: "Placeholder maintenance note with expected downtime and recovery window.",
    category: "Maintenance",
    region: "Global",
    sourceStatus: "confirmed",
    lastUpdated: "2026-05-10",
    sourceUrl: "https://example.com/maintenance-placeholder",
  },
  {
    id: "u5",
    title: "KR Balance Follow-up",
    summary: "Placeholder follow-up note for combat adjustments and bug fixes.",
    category: "Patch Notes",
    region: "KR",
    sourceStatus: "expected",
    lastUpdated: "2026-05-10",
  },
];

