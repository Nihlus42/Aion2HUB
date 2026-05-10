import { createFileRoute } from "@tanstack/react-router";
import { GearPlanner } from "@/components/gear/GearPlanner";

export const Route = createFileRoute("/planificateur-equipement")({
  head: () => ({
    meta: [
      { title: "Planificateur d equipement - Aion 2 Hub" },
      { name: "description", content: "Planificateur d equipement Aion 2 en francais." },
    ],
  }),
  component: GearPlanner,
});
