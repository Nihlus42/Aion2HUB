import { getItemById, itemsById, itemsLight, type ItemLight } from "@/data";
import type { GearBuildSlots } from "@/lib/aion2/gear/buildStorage";
import { gearSlots, type GearSlotId } from "@/lib/aion2/gear/slotDefinitions";
import { GearSlot } from "./GearSlot";

const areaBySlot: Record<GearSlotId, string> = {
  mainWeapon: "main",
  offHand: "offhand",
  helmet: "head",
  chest: "chest",
  gloves: "gloves",
  pants: "legs",
  boots: "boots",
  necklace: "neck",
  earring1: "ear1",
  earring2: "ear2",
  ring1: "ring1",
  ring2: "ring2",
  belt: "belt",
  wings: "wings",
};

type Props = {
  build: GearBuildSlots;
  onSelectSlot: (slotId: GearSlotId) => void;
  onRemoveSlot: (slotId: GearSlotId) => void;
  onFocusItem: (slotId: GearSlotId) => void;
};

export function GearPaperDoll({ build, onSelectSlot, onRemoveSlot, onFocusItem }: Props) {
  const byLight = new Map(itemsLight.map((it) => [it.id, it]));

  const getItem = (itemId?: string): ItemLight | null => {
    if (!itemId) return null;
    return (byLight.get(itemId) ?? (getItemById(itemId) as any) ?? (itemsById[itemId] as any) ?? null) as ItemLight | null;
  };

  return (
    <section className="rune-border rounded-xl p-3">
      <h3 className="font-display text-xl mb-3">Equipement</h3>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gridTemplateAreas: `
            ". head . wings"
            "neck chest chest offhand"
            "main gloves legs boots"
            "ear1 ring1 belt ring2"
            "ear2 . . ."
          `,
        }}
      >
        {gearSlots.map((slot) => {
          const equipped = build[slot.id];
          return (
            <div key={slot.id} style={{ gridArea: areaBySlot[slot.id] }} onMouseEnter={() => onFocusItem(slot.id)}>
              <GearSlot
                slotLabel={slot.label}
                item={getItem(equipped?.itemId)}
                enchantLevel={equipped?.enchantLevel ?? 0}
                onSelect={() => onSelectSlot(slot.id)}
                onRemove={() => onRemoveSlot(slot.id)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
