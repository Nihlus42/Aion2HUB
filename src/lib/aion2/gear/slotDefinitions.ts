export type GearSlotId =
  | "mainWeapon"
  | "offHand"
  | "helmet"
  | "chest"
  | "gloves"
  | "pants"
  | "boots"
  | "necklace"
  | "earring1"
  | "earring2"
  | "ring1"
  | "ring2"
  | "belt"
  | "wings";

export type GearSlot = {
  id: GearSlotId;
  label: string;
};

export const gearSlots: GearSlot[] = [
  { id: "mainWeapon", label: "Arme principale" },
  { id: "offHand", label: "Arme secondaire / Bouclier" },
  { id: "helmet", label: "Casque" },
  { id: "chest", label: "Plastron" },
  { id: "gloves", label: "Gants" },
  { id: "pants", label: "Jambieres" },
  { id: "boots", label: "Bottes" },
  { id: "necklace", label: "Collier" },
  { id: "earring1", label: "Boucle d oreille 1" },
  { id: "earring2", label: "Boucle d oreille 2" },
  { id: "ring1", label: "Anneau 1" },
  { id: "ring2", label: "Anneau 2" },
  { id: "belt", label: "Ceinture" },
  { id: "wings", label: "Ailes" },
];

export const classOptions = [
  { slug: "gladiator", label: "Gladiateur" },
  { slug: "templar", label: "Templier" },
  { slug: "assassin", label: "Assassin" },
  { slug: "ranger", label: "Rodeur" },
  { slug: "spiritmaster", label: "Spiritualiste" },
  { slug: "sorcerer", label: "Sorcier" },
  { slug: "cleric", label: "Clerc" },
  { slug: "chanter", label: "Aede" },
] as const;
