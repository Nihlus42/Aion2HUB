import type { DisplayItem } from "@/data";
import type { GearSlotId } from "./slotDefinitions";

const includesAny = (value: string, needles: string[]) => needles.some((n) => value.includes(n));

export const isItemCompatibleWithSlot = (item: DisplayItem, slotId: GearSlotId) => {
  const main = (item.mainCategory ?? "").toLowerCase();
  const catEn = (item.categoryEn ?? "").toLowerCase();
  const catFr = (item.categoryFr ?? "").toLowerCase();
  const sub = (item.subCategory ?? "").toLowerCase();
  const all = `${main} ${catEn} ${catFr} ${sub}`;

  if (slotId === "mainWeapon") return main === "weapons" || includesAny(all, ["sword", "greatsword", "dagger", "bow", "staff", "mace", "orb", "tome", "arme"]);
  if (slotId === "offHand") return includesAny(all, ["shield", "bouclier", "secondary", "subweapon", "dague"]);
  if (slotId === "helmet") return includesAny(all, ["helmet", "casque", "head"]);
  if (slotId === "chest") return includesAny(all, ["chest", "plastron", "armor top", "torse"]);
  if (slotId === "gloves") return includesAny(all, ["gloves", "gants"]);
  if (slotId === "pants") return includesAny(all, ["pants", "jamb", "leggings"]);
  if (slotId === "boots") return includesAny(all, ["boots", "bottes"]);
  if (slotId === "necklace") return includesAny(all, ["necklace", "collier"]);
  if (slotId === "earring1" || slotId === "earring2") return includesAny(all, ["earring", "boucle"]);
  if (slotId === "ring1" || slotId === "ring2") return includesAny(all, ["ring", "anneau"]);
  if (slotId === "belt") return includesAny(all, ["belt", "ceinture"]);
  if (slotId === "wings") return main === "wings" || includesAny(all, ["wing", "aile"]);
  return false;
};
