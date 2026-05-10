import { createFileRoute } from "@tanstack/react-router";
import { DaevanionPlanner } from "@/components/daevanion/DaevanionPlanner";

export const Route = createFileRoute("/daevanion-planner")({
  head: () => ({
    meta: [
      { title: "Planificateur Daevanion - Aion 2 Hub" },
      { name: "description", content: "Planificateur Daevanion en français pour construire vos plateaux de compétences." },
    ],
  }),
  component: DaevanionPlanner,
});
