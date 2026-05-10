export interface Skill {
  id: string;
  name: string;
  type: "Active" | "Passive" | "Stigma";
  cost: number;
  description: string;
}

export const skillsByClass: Record<string, Skill[]> = {
  gladiator: [
    {
      id: "g1",
      name: "Crippling Cut",
      type: "Active",
      cost: 50,
      description: "A heavy slash that reduces target's movement speed.",
    },
    {
      id: "g2",
      name: "Aether's Hold",
      type: "Active",
      cost: 80,
      description: "Suspends target in mid-air, opening a combo window.",
    },
    {
      id: "g3",
      name: "Battle Stance",
      type: "Passive",
      cost: 0,
      description: "Increases physical attack by 8%.",
    },
    {
      id: "g4",
      name: "Severe Weakening",
      type: "Stigma",
      cost: 120,
      description: "Reduces target's damage dealt for 12s.",
    },
    {
      id: "g5",
      name: "Lockdown",
      type: "Active",
      cost: 60,
      description: "Stuns target briefly on critical hit.",
    },
    {
      id: "g6",
      name: "Tempest Spear",
      type: "Stigma",
      cost: 100,
      description: "AoE polearm strike that hits up to 5 enemies.",
    },
  ],
  templar: [
    {
      id: "t1",
      name: "Divine Shield",
      type: "Active",
      cost: 70,
      description: "Immune to damage for 4 seconds.",
    },
    {
      id: "t2",
      name: "Provoke",
      type: "Active",
      cost: 30,
      description: "Forces target to attack you.",
    },
    {
      id: "t3",
      name: "Iron Skin",
      type: "Passive",
      cost: 0,
      description: "Permanent +12% physical defense.",
    },
    {
      id: "t4",
      name: "Empyrean Wrath",
      type: "Stigma",
      cost: 150,
      description: "Powerful holy strike with knockdown.",
    },
  ],
};

