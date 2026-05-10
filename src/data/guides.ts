export type GuideCategory = "beginner" | "leveling" | "pvp" | "pve";

export interface Guide {
  id: string;
  title: string;
  excerpt: string;
  category: GuideCategory;
  readTime: number;
  author: string;
}

export const guides: Guide[] = [
  {
    id: "1",
    title: "Your First Hour in Atreia",
    excerpt:
      "Everything new Daevas should do in their first session - from controls to faction choice.",
    category: "beginner",
    readTime: 6,
    author: "Lumiel",
  },
  {
    id: "2",
    title: "Choosing Your Faction",
    excerpt:
      "Elyos vs Asmodian - gameplay differences, lore, and which fits your style.",
    category: "beginner",
    readTime: 4,
    author: "Lumiel",
  },
  {
    id: "3",
    title: "Optimal 1-55 Leveling Route",
    excerpt:
      "The fastest known leveling path, including campaign quests and grind spots.",
    category: "leveling",
    readTime: 12,
    author: "Kahrun",
  },
  {
    id: "4",
    title: "XP Boost Stacking Guide",
    excerpt:
      "Every active multiplier and how to time them for power-leveling weekends.",
    category: "leveling",
    readTime: 7,
    author: "Kahrun",
  },
  {
    id: "5",
    title: "Sieges 101: Forts & Artifacts",
    excerpt:
      "How sieges work, what artifacts do, and how to coordinate with your alliance.",
    category: "pvp",
    readTime: 9,
    author: "Veille",
  },
  {
    id: "6",
    title: "1v1 Class Matchup Tier List",
    excerpt:
      "Updated PvP matchup chart with notes on counterplay for every class.",
    category: "pvp",
    readTime: 11,
    author: "Veille",
  },
  {
    id: "7",
    title: "Endgame Dungeon Rotation",
    excerpt:
      "Weekly lockouts, loot priority, and group compositions for current tier raids.",
    category: "pve",
    readTime: 10,
    author: "Sariel",
  },
  {
    id: "8",
    title: "Crafting Mastery Path",
    excerpt:
      "Which profession to pick, where to power-level it, and which recipes pay off.",
    category: "pve",
    readTime: 8,
    author: "Sariel",
  },
];

