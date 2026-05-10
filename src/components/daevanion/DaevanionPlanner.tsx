import { useEffect, useMemo, useState } from "react";
import { daevanionBoards, daevanionClasses, translateClassName } from "@/lib/aion2/daevanion/translate";
import { getSkillForDaevanionNode, getSkillsByClass, normalizeClassSlug, type NormalizedSkill } from "@/data";

type PlannerBuild = {
  class: string;
  boardId: number;
  selectedNodeIds: number[];
};

const STORAGE_KEY = "aion2hub_daevanion_build";
const GRID_SIZE = 15;

const gradeClassMap: Record<string, string> = {
  Commun: "border-slate-500/70",
  Rare: "border-blue-400/80",
  Unique: "border-violet-400/80",
  Legendaire: "border-amber-400/80",
  Epique: "border-rose-400/80",
  Heroique: "border-red-500/80",
};

const statShortMap: Record<string, string> = {
  HP: "PV",
  MP: "PM",
  "Max HP": "PV",
  "Max MP": "PM",
  Attack: "Attaque",
  "Attack Bonus": "Attaque",
  Defense: "Defense",
  "Defense Bonus": "Defense",
  "Critical Hit": "Critique",
  "Critical Hit Resist": "Resist critique",
  Accuracy: "Precision",
  "Combat Speed": "Vitesse",
  Evasion: "Esquive",
  Block: "Blocage",
};

const safeParse = (value: string): PlannerBuild | null => {
  try {
    const parsed = JSON.parse(value) as PlannerBuild;
    if (!parsed || typeof parsed.class !== "string" || typeof parsed.boardId !== "number" || !Array.isArray(parsed.selectedNodeIds)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

const getNodeDisplayTitle = (node: any, skill?: NormalizedSkill | null) => {
  if (node.type === "Start") return "Depart";
  if (node.type === "SkillLevel") return skill?.nameFr || "Competence inconnue";
  if (node.type === "Stat") {
    const stat = statShortMap[node.effect?.stat ?? ""] ?? node.effect?.stat ?? "Stat";
    const amount = Number(node.effect?.amount ?? 0);
    return `+${Number.isFinite(amount) ? amount : 0} ${stat}`;
  }
  return "";
};

const getNodeDisplaySubtitle = (node: any) => {
  if (node.type === "Start") return "Node initial";
  if (node.type === "SkillLevel") return "Competence";
  if (node.type === "Stat") return "Stat";
  return "";
};

const getNodeDisplayCost = (node: any) => `${node.cost_points ?? 0} pt${(node.cost_points ?? 0) > 1 ? "s" : ""}`;

const getBoardNodeAtPosition = (nodes: any[], row: number, col: number) =>
  nodes.find((node) => node.row === row && node.col === col) ?? null;

const buildBoardGrid = (nodes: any[]) => {
  const cells: Array<{ row: number; col: number; node: any | null }> = [];
  for (let row = 1; row <= GRID_SIZE; row += 1) {
    for (let col = 1; col <= GRID_SIZE; col += 1) {
      cells.push({ row, col, node: getBoardNodeAtPosition(nodes, row, col) });
    }
  }
  return cells;
};

export function DaevanionPlanner() {
  const [selectedClass, setSelectedClass] = useState(daevanionClasses[0]?.en ?? "Assassin");
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  const [selectedNodeIds, setSelectedNodeIds] = useState<number[]>([]);
  const [focusedNodeId, setFocusedNodeId] = useState<number | null>(null);
  const [importText, setImportText] = useState("");

  const classBoards = useMemo(
    () => daevanionBoards.filter((board) => board.class === selectedClass).sort((a, b) => a.order - b.order),
    [selectedClass],
  );

  useEffect(() => {
    if (classBoards.length === 0) {
      setSelectedBoardId(null);
      setSelectedNodeIds([]);
      return;
    }
    setSelectedBoardId((prev) => (prev && classBoards.some((b) => b.id === prev) ? prev : classBoards[0].id));
  }, [classBoards]);

  const selectedBoard = useMemo(
    () => classBoards.find((board) => board.id === selectedBoardId) ?? null,
    [classBoards, selectedBoardId],
  );

  useEffect(() => {
    if (!selectedBoard) return;
    const autoLearnNodes = selectedBoard.nodes.filter((node) => node.auto_learn).map((node) => node.id);
    setSelectedNodeIds((prev) => {
      const kept = prev.filter((id) => selectedBoard.nodes.some((node) => node.id === id));
      return Array.from(new Set([...autoLearnNodes, ...kept]));
    });
  }, [selectedBoard]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = safeParse(raw);
    if (!parsed) return;
    setSelectedClass(parsed.class);
    setSelectedBoardId(parsed.boardId);
    setSelectedNodeIds(parsed.selectedNodeIds);
  }, []);

  useEffect(() => {
    if (!selectedBoardId) return;
    const payload: PlannerBuild = { class: selectedClass, boardId: selectedBoardId, selectedNodeIds };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [selectedClass, selectedBoardId, selectedNodeIds]);

  const selectedNode = useMemo(
    () => selectedBoard?.nodes.find((node) => node.id === focusedNodeId) ?? null,
    [selectedBoard, focusedNodeId],
  );

  const selectedNodeSkill = useMemo(() => {
    if (!selectedNode || selectedNode.type !== "SkillLevel") return null;
    return getSkillForDaevanionNode(selectedNode);
  }, [selectedNode]);

  const boardCells = useMemo(() => buildBoardGrid(selectedBoard?.nodes ?? []), [selectedBoard]);

  const skillsByClass = useMemo(
    () => getSkillsByClass(normalizeClassSlug(selectedClass)),
    [selectedClass],
  );

  const skillById = useMemo(() => new Map(skillsByClass.map((skill) => [skill.id, skill])), [skillsByClass]);

  const summary = useMemo(() => {
    if (!selectedBoard) return { pointsUsed: 0, totalCost: 0, refundGold: 0, crystalType: "Cristal" };
    const selectedNodes = selectedBoard.nodes.filter((node) => selectedNodeIds.includes(node.id));
    return {
      pointsUsed: selectedNodes.length,
      totalCost: selectedNodes.reduce((acc, node) => acc + (node.cost_points || 0), 0),
      refundGold: selectedNodes.reduce((acc, node) => acc + (node.refund_gold || 0), 0),
      crystalType: selectedBoard.costPointTypeFr || "Cristal",
    };
  }, [selectedBoard, selectedNodeIds]);

  const toggleNode = (nodeId: number) => {
    if (!selectedBoard) return;
    const node = selectedBoard.nodes.find((it) => it.id === nodeId);
    if (!node || node.type === "None" || node.auto_learn) return;
    setSelectedNodeIds((prev) => (prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]));
    setFocusedNodeId(nodeId);
  };

  const resetBoard = () => {
    if (!selectedBoard) return;
    setSelectedNodeIds(selectedBoard.nodes.filter((node) => node.auto_learn).map((node) => node.id));
    setFocusedNodeId(null);
  };

  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSelectedClass(daevanionClasses[0]?.en ?? "Assassin");
    setSelectedBoardId(null);
    setSelectedNodeIds([]);
    setFocusedNodeId(null);
  };

  const exportBuild = () => {
    if (!selectedBoard) return;
    const payload: PlannerBuild = { class: selectedClass, boardId: selectedBoard.id, selectedNodeIds };
    setImportText(JSON.stringify(payload));
  };

  const importBuild = () => {
    const parsed = safeParse(importText.trim());
    if (!parsed) return;
    setSelectedClass(parsed.class);
    setSelectedBoardId(parsed.boardId);
    setSelectedNodeIds(parsed.selectedNodeIds);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-6">
        <p className="text-xs tracking-[0.2em] text-gold mb-2">THEORIECRAFT</p>
        <h1 className="font-display text-4xl mb-2">Planificateur Daevanion</h1>
        <p className="text-sm text-muted-foreground">Source skills prioritaire: Talentbuilds FR.</p>
      </header>

      <section className="rune-border rounded-xl p-4 grid gap-3 md:grid-cols-4 mb-5">
        <label className="text-sm"><span className="block text-xs text-muted-foreground mb-1">Classe</span><select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full bg-background/70 border border-border rounded-md px-3 py-2">{daevanionClasses.map((klass) => (<option key={klass.en} value={klass.en}>{klass.fr}</option>))}</select></label>
        <label className="text-sm"><span className="block text-xs text-muted-foreground mb-1">Plateau</span><select value={selectedBoardId ?? ""} onChange={(e) => setSelectedBoardId(Number(e.target.value))} className="w-full bg-background/70 border border-border rounded-md px-3 py-2">{classBoards.map((board) => (<option key={board.id} value={board.id}>{board.titleFr}</option>))}</select></label>
        <div className="text-sm"><span className="block text-xs text-muted-foreground mb-1">Niveau requis</span><div className="bg-background/70 border border-border rounded-md px-3 py-2">{selectedBoard?.required_level ?? "-"}</div></div>
        <div className="text-sm"><span className="block text-xs text-muted-foreground mb-1">Type de cristal</span><div className="bg-background/70 border border-border rounded-md px-3 py-2">{selectedBoard?.costPointTypeFr || "Inconnu"}</div></div>
      </section>

      <div className="grid xl:grid-cols-[1fr_340px] gap-5">
        <section className="rune-border rounded-xl p-3 overflow-auto">
          <div className="grid gap-1.5 justify-start" style={{ gridTemplateColumns: "repeat(15, 82px)", gridTemplateRows: "repeat(15, 82px)" }}>
            {boardCells.map((cell) => {
              const node = cell.node;
              const hidden = !node || node.type === "None";
              if (hidden) {
                return <div key={`empty-${cell.row}-${cell.col}`} className="h-[82px] w-[82px] rounded-md border border-transparent bg-transparent opacity-10" style={{ gridColumn: cell.col, gridRow: cell.row }} />;
              }
              const picked = selectedNodeIds.includes(node.id);
              const borderClass = gradeClassMap[node.gradeFr] ?? "border-border/60";
              const typeClass = node.type === "Start" ? "bg-gold/15 shadow-gold-glow" : node.type === "SkillLevel" ? "bg-indigo-500/10" : "bg-background/60";
              const nodeSkill = node.type === "SkillLevel" ? getSkillForDaevanionNode(node) ?? skillById.get(String(node.effect?.skill_id ?? "")) ?? null : null;
              return (
                <button key={`node-${node.id}-${cell.row}-${cell.col}`} onClick={() => toggleNode(node.id)} onFocus={() => setFocusedNodeId(node.id)} className={`h-[82px] w-[82px] rounded-md border text-left transition p-1.5 ${borderClass} ${typeClass} hover:translate-y-[-1px] ${picked ? "ring-1 ring-gold/70" : ""}`} style={{ gridColumn: cell.col, gridRow: cell.row }}>
                  <div className="h-full flex flex-col">
                    {nodeSkill?.imageUrl ? <img src={nodeSkill.imageUrl} alt={nodeSkill.nameFr} className="w-5 h-5 rounded border border-border object-cover mb-0.5" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} /> : null}
                    <div className="text-[11px] font-semibold leading-tight line-clamp-2">{getNodeDisplayTitle(node, nodeSkill)}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{getNodeDisplaySubtitle(node)}</div>
                    <div className="mt-auto"><span className="inline-flex text-[9px] px-1 py-0.5 rounded border border-border bg-background/70 text-muted-foreground">{getNodeDisplayCost(node)}</span></div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <aside className="rune-border rounded-xl p-4 space-y-3 h-fit">
          <h2 className="font-display text-xl">Node selectionne</h2>
          {!selectedNode ? (
            <p className="text-sm text-muted-foreground">Aucun node selectionne</p>
          ) : (
            <div className="space-y-1.5 text-sm">
              {selectedNodeSkill?.imageUrl ? <img src={selectedNodeSkill.imageUrl} alt={selectedNodeSkill.nameFr} className="w-16 h-16 rounded border border-border object-cover" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} /> : null}
              <p><span className="text-gold">Nom :</span> {getNodeDisplayTitle(selectedNode, selectedNodeSkill)}</p>
              <p><span className="text-gold">Type :</span> {getNodeDisplaySubtitle(selectedNode)}</p>
              <p><span className="text-gold">Grade :</span> {selectedNode.gradeFr}</p>
              <p><span className="text-gold">Niveau requis :</span> {selectedNode.required_level}</p>
              <p><span className="text-gold">Cout :</span> {getNodeDisplayCost(selectedNode)}</p>
              <p><span className="text-gold">Remboursement en Kinah :</span> {selectedNode.refund_gold}</p>
              <p><span className="text-gold">Effet :</span> {selectedNode.type === "SkillLevel" && selectedNodeSkill ? `${selectedNodeSkill.nameFr} +${selectedNode.effect?.levels ?? 1} niveau` : selectedNode.effectFr}</p>
              {selectedNodeSkill && (
                <>
                  <p><span className="text-gold">Description :</span> {selectedNodeSkill.descriptionFr || "Description indisponible"}</p>
                  {(selectedNodeSkill.specialtyFr?.length ?? 0) > 0 && <p><span className="text-gold">Specialites :</span> {selectedNodeSkill.specialtyFr!.join(" | ")}</p>}
                  {(selectedNodeSkill.tagsFr?.length ?? 0) > 0 && <p><span className="text-gold">Tags :</span> {selectedNodeSkill.tagsFr!.join(", ")}</p>}
                </>
              )}
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            <button onClick={resetBoard} className="px-3 py-2 rounded-md bg-accent/30 hover:bg-accent/50 text-sm">Reinitialiser le plateau</button>
            <button onClick={resetAll} className="px-3 py-2 rounded-md bg-accent/30 hover:bg-accent/50 text-sm">Tout reinitialiser</button>
          </div>
        </aside>
      </div>

      <section className="rune-border rounded-xl p-4 mt-5">
        <h3 className="font-display text-xl mb-3">Resume du build</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <div className="bg-background/50 border border-border rounded-md p-3"><span className="text-muted-foreground">Classe</span><div>{translateClassName(selectedClass)}</div></div>
          <div className="bg-background/50 border border-border rounded-md p-3"><span className="text-muted-foreground">Points utilises</span><div>{summary.pointsUsed}</div></div>
          <div className="bg-background/50 border border-border rounded-md p-3"><span className="text-muted-foreground">Cout total</span><div>{summary.totalCost} {summary.crystalType}</div></div>
          <div className="bg-background/50 border border-border rounded-md p-3"><span className="text-muted-foreground">Remboursement en Kinah</span><div>{summary.refundGold}</div></div>
        </div>
        <div className="mt-4 grid lg:grid-cols-[1fr_auto_auto] gap-2">
          <textarea value={importText} onChange={(e) => setImportText(e.target.value)} placeholder="Collez ici un JSON exporte..." className="min-h-20 bg-background/60 border border-border rounded-md px-3 py-2 text-xs" />
          <button onClick={exportBuild} className="px-3 py-2 rounded-md bg-gradient-arcane text-primary-foreground text-sm">Exporter le build</button>
          <button onClick={importBuild} className="px-3 py-2 rounded-md bg-gradient-arcane text-primary-foreground text-sm">Importer un build</button>
        </div>
      </section>
    </div>
  );
}

