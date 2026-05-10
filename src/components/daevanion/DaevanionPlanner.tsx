import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { daevanionBoards, daevanionClasses, translateClassName } from "@/lib/aion2/daevanion/translate";
import { getSkillForDaevanionNode, getSkillsByClass, normalizeClassSlug, type NormalizedSkill } from "@/data";

type PlannerBuild = {
  class: string;
  boardId: number;
  selectedNodeIds: number[];
};

type BoardNode = any;

const STORAGE_KEY = "aion2hub_daevanion_build";
const VIEW_KEY = "aion2hub_daevanion_view";
const GRID_SIZE = 15;
const ZOOM_MIN = 0.6;
const ZOOM_MAX = 2.2;
const ZOOM_STEP = 0.08;
const DRAG_THRESHOLD = 6;

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
  "Critical Hit Resist": "Resist. crit.",
  "Critical Damage Boost": "Degats crit.",
  Accuracy: "Precision",
  "Combat Speed": "Vitesse",
  Evasion: "Esquive",
  Block: "Blocage",
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const safeParseBuild = (value: string): PlannerBuild | null => {
  try {
    const parsed = JSON.parse(value) as PlannerBuild;
    if (!parsed || typeof parsed.class !== "string" || typeof parsed.boardId !== "number" || !Array.isArray(parsed.selectedNodeIds)) return null;
    return parsed;
  } catch {
    return null;
  }
};

const getNodeDisplayTitle = (node: BoardNode, skill?: NormalizedSkill | null) => {
  if (node.type === "Start") return "Depart";
  if (node.type === "SkillLevel") return skill?.nameFr || "Competence inconnue";
  if (node.type === "Stat") {
    const stat = statShortMap[node.effect?.stat ?? ""] ?? node.effect?.stat ?? "Stat";
    const amount = Number(node.effect?.amount ?? 0);
    return `+${Number.isFinite(amount) ? amount : 0} ${stat}`;
  }
  return "";
};

const getNodeDisplaySubtitle = (node: BoardNode) => {
  if (node.type === "Start") return "Node initial";
  if (node.type === "SkillLevel") return "Competence";
  if (node.type === "Stat") return "Stat";
  return "";
};

const getNodeDisplayCost = (node: BoardNode) => `${node.cost_points ?? 0} pt${(node.cost_points ?? 0) > 1 ? "s" : ""}`;

const buildBoardGrid = (nodes: BoardNode[]) => {
  const byPos = new Map<string, BoardNode>();
  for (const node of nodes) byPos.set(`${node.row}:${node.col}`, node);
  const cells: Array<{ row: number; col: number; node: BoardNode | null }> = [];
  for (let row = 1; row <= GRID_SIZE; row += 1) {
    for (let col = 1; col <= GRID_SIZE; col += 1) {
      cells.push({ row, col, node: byPos.get(`${row}:${col}`) ?? null });
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
  const [viewMode, setViewMode] = useState<"compact" | "readable">("compact");
  const [zoomLevel, setZoomLevel] = useState(0.9);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const interactionRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
    moved: false,
  });
  const suppressClickUntilRef = useRef(0);

  const classBoards = useMemo(() => daevanionBoards.filter((board) => board.class === selectedClass).sort((a, b) => a.order - b.order), [selectedClass]);

  useEffect(() => {
    if (classBoards.length === 0) {
      setSelectedBoardId(null);
      setSelectedNodeIds([]);
      return;
    }
    setSelectedBoardId((prev) => (prev && classBoards.some((b) => b.id === prev) ? prev : classBoards[0].id));
  }, [classBoards]);

  const selectedBoard = useMemo(() => classBoards.find((board) => board.id === selectedBoardId) ?? null, [classBoards, selectedBoardId]);

  useEffect(() => {
    if (!selectedBoard) return;
    const autoLearnNodes = selectedBoard.nodes.filter((node) => node.auto_learn).map((node) => node.id);
    setSelectedNodeIds((prev) => {
      const kept = prev.filter((id) => selectedBoard.nodes.some((node) => node.id === id));
      return Array.from(new Set([...autoLearnNodes, ...kept]));
    });
  }, [selectedBoard]);

  useEffect(() => {
    const rawBuild = localStorage.getItem(STORAGE_KEY);
    if (rawBuild) {
      const parsed = safeParseBuild(rawBuild);
      if (parsed) {
        setSelectedClass(parsed.class);
        setSelectedBoardId(parsed.boardId);
        setSelectedNodeIds(parsed.selectedNodeIds);
      }
    }
    const rawView = localStorage.getItem(VIEW_KEY);
    if (rawView) {
      try {
        const parsed = JSON.parse(rawView) as { zoomLevel?: number; panX?: number; panY?: number; viewMode?: "compact" | "readable" };
        if (typeof parsed.zoomLevel === "number") setZoomLevel(clamp(parsed.zoomLevel, ZOOM_MIN, ZOOM_MAX));
        if (typeof parsed.panX === "number" && typeof parsed.panY === "number") setPanPosition({ x: parsed.panX, y: parsed.panY });
        if (parsed.viewMode === "compact" || parsed.viewMode === "readable") setViewMode(parsed.viewMode);
      } catch {
        // noop
      }
    }
  }, []);

  useEffect(() => {
    if (!selectedBoardId) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ class: selectedClass, boardId: selectedBoardId, selectedNodeIds }));
  }, [selectedClass, selectedBoardId, selectedNodeIds]);

  useEffect(() => {
    localStorage.setItem(VIEW_KEY, JSON.stringify({ zoomLevel, panX: panPosition.x, panY: panPosition.y, viewMode }));
  }, [zoomLevel, panPosition, viewMode]);

  const selectedNode = useMemo(() => selectedBoard?.nodes.find((node) => node.id === focusedNodeId) ?? null, [selectedBoard, focusedNodeId]);
  const selectedNodeSkill = useMemo(() => (selectedNode && selectedNode.type === "SkillLevel" ? getSkillForDaevanionNode(selectedNode) : null), [selectedNode]);

  const boardCells = useMemo(() => buildBoardGrid(selectedBoard?.nodes ?? []), [selectedBoard]);
  const skillsByClass = useMemo(() => getSkillsByClass(normalizeClassSlug(selectedClass)), [selectedClass]);
  const skillById = useMemo(() => new Map(skillsByClass.map((skill) => [skill.id, skill])), [skillsByClass]);

  const nodeById = useMemo(() => {
    const m = new Map<number, BoardNode>();
    for (const c of boardCells) if (c.node) m.set(c.node.id, c.node);
    return m;
  }, [boardCells]);

  const hoveredNode = hoveredNodeId ? nodeById.get(hoveredNodeId) ?? null : null;
  const hoveredNodeSkill = hoveredNode && hoveredNode.type === "SkillLevel" ? getSkillForDaevanionNode(hoveredNode) ?? skillById.get(String(hoveredNode.effect?.skill_id ?? "")) ?? null : null;

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

  const nodeSize = viewMode === "compact" ? 48 : 58;
  const nodeGap = viewMode === "compact" ? 4 : 6;
  const boardBaseSize = GRID_SIZE * nodeSize + (GRID_SIZE - 1) * nodeGap;

  const fitBoardToContainer = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const fitZoom = clamp((rect.width - 16) / boardBaseSize, ZOOM_MIN, ZOOM_MAX);
    setZoomLevel(Number(fitZoom.toFixed(2)));
    setPanPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    fitBoardToContainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBoardId, viewMode]);

  const applyZoomAtPoint = (nextZoomRaw: number, clientX: number, clientY: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const nextZoom = clamp(nextZoomRaw, ZOOM_MIN, ZOOM_MAX);
    if (nextZoom === zoomLevel) return;

    const rect = viewport.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const px = clientX - rect.left;
    const py = clientY - rect.top;

    const localX = (px - cx - panPosition.x) / zoomLevel;
    const localY = (py - cy - panPosition.y) / zoomLevel;

    const nextPanX = px - cx - localX * nextZoom;
    const nextPanY = py - cy - localY * nextZoom;

    setZoomLevel(Number(nextZoom.toFixed(2)));
    setPanPosition({ x: nextPanX, y: nextPanY });
  };

  const toggleNode = (nodeId: number) => {
    if (Date.now() < suppressClickUntilRef.current) return;
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
    setImportText(JSON.stringify({ class: selectedClass, boardId: selectedBoard.id, selectedNodeIds }));
  };

  const importBuild = () => {
    const parsed = safeParseBuild(importText.trim());
    if (!parsed) return;
    setSelectedClass(parsed.class);
    setSelectedBoardId(parsed.boardId);
    setSelectedNodeIds(parsed.selectedNodeIds);
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    interactionRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startPanX: panPosition.x,
      startPanY: panPosition.y,
      moved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const s = interactionRef.current;
    if (!s.active || s.pointerId !== e.pointerId) return;
    const dx = e.clientX - s.startX;
    const dy = e.clientY - s.startY;
    if (!s.moved && Math.hypot(dx, dy) >= DRAG_THRESHOLD) {
      s.moved = true;
      setIsPanning(true);
    }
    if (s.moved) {
      setPanPosition({ x: s.startPanX + dx, y: s.startPanY + dy });
    }
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const s = interactionRef.current;
    if (!s.active || s.pointerId !== e.pointerId) return;
    if (s.moved) suppressClickUntilRef.current = Date.now() + 120;
    interactionRef.current.active = false;
    setIsPanning(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // noop
    }
  };

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    e.preventDefault();
    applyZoomAtPoint(zoomLevel + delta, e.clientX, e.clientY);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setHoveredNodeId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const boardTransform = `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`;

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-6">
        <p className="text-xs tracking-[0.2em] text-gold mb-2">THEORIECRAFT</p>
        <h1 className="font-display text-4xl mb-2">Planificateur Daevanion</h1>
        <p className="text-sm text-muted-foreground">Source skills prioritaire: Talentbuilds FR.</p>
      </header>

      <section className="rune-border rounded-xl p-4 grid gap-3 md:grid-cols-4 mb-4">
        <label className="text-sm"><span className="block text-xs text-muted-foreground mb-1">Classe</span><select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full bg-background/70 border border-border rounded-md px-3 py-2">{daevanionClasses.map((klass) => (<option key={klass.en} value={klass.en}>{klass.fr}</option>))}</select></label>
        <label className="text-sm"><span className="block text-xs text-muted-foreground mb-1">Plateau</span><select value={selectedBoardId ?? ""} onChange={(e) => setSelectedBoardId(Number(e.target.value))} className="w-full bg-background/70 border border-border rounded-md px-3 py-2">{classBoards.map((board) => (<option key={board.id} value={board.id}>{board.titleFr}</option>))}</select></label>
        <div className="text-sm"><span className="block text-xs text-muted-foreground mb-1">Niveau requis</span><div className="bg-background/70 border border-border rounded-md px-3 py-2">{selectedBoard?.required_level ?? "-"}</div></div>
        <div className="text-sm"><span className="block text-xs text-muted-foreground mb-1">Type de cristal</span><div className="bg-background/70 border border-border rounded-md px-3 py-2">{selectedBoard?.costPointTypeFr || "Inconnu"}</div></div>
      </section>

      <div className="mb-2 flex flex-wrap gap-2">
        <button onClick={() => setZoomLevel((z) => clamp(Number((z - ZOOM_STEP).toFixed(2)), ZOOM_MIN, ZOOM_MAX))} className="px-3 py-1.5 rounded-md text-sm border border-border hover:bg-accent/20">Zoom -</button>
        <button onClick={() => setZoomLevel((z) => clamp(Number((z + ZOOM_STEP).toFixed(2)), ZOOM_MIN, ZOOM_MAX))} className="px-3 py-1.5 rounded-md text-sm border border-border hover:bg-accent/20">Zoom +</button>
        <button onClick={fitBoardToContainer} className="px-3 py-1.5 rounded-md text-sm border border-gold/50 text-gold hover:bg-gold/10">Ajuster a l ecran</button>
        <button onClick={() => { setPanPosition({ x: 0, y: 0 }); setZoomLevel(1); }} className="px-3 py-1.5 rounded-md text-sm border border-border hover:bg-accent/20">Reinitialiser la vue</button>
        <button onClick={() => setViewMode("compact")} className={`px-3 py-1.5 rounded-md text-sm border ${viewMode === "compact" ? "border-gold/60 text-gold bg-gold/10" : "border-border hover:bg-accent/20"}`}>Vue compacte</button>
        <button onClick={() => setViewMode("readable")} className={`px-3 py-1.5 rounded-md text-sm border ${viewMode === "readable" ? "border-gold/60 text-gold bg-gold/10" : "border-border hover:bg-accent/20"}`}>Vue lisible</button>
        <div className="px-3 py-1.5 rounded-md text-xs border border-border text-muted-foreground">Zoom {Math.round(zoomLevel * 100)}%</div>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Molette : zoomer / dezoomer · Clic maintenu : deplacer</p>

      <div className="grid 2xl:grid-cols-[1fr_320px] gap-5">
        <section className="rune-border rounded-xl p-3">
          <div
            ref={viewportRef}
            className="relative w-full min-h-[560px] overflow-hidden touch-none"
            onWheel={onWheel}
            onDoubleClick={fitBoardToContainer}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{ cursor: isPanning ? "grabbing" : "grab" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="grid select-none"
                style={{
                  width: `${boardBaseSize}px`,
                  height: `${boardBaseSize}px`,
                  gap: `${nodeGap}px`,
                  gridTemplateColumns: `repeat(${GRID_SIZE}, ${nodeSize}px)`,
                  gridTemplateRows: `repeat(${GRID_SIZE}, ${nodeSize}px)`,
                  transform: boardTransform,
                  transformOrigin: "center center",
                } as CSSProperties}
              >
                {boardCells.map((cell) => {
                  const node = cell.node;
                  const hidden = !node || node.type === "None";
                  if (hidden) {
                    return <div key={`empty-${cell.row}-${cell.col}`} className="rounded-md border border-transparent bg-transparent opacity-5" style={{ gridColumn: cell.col, gridRow: cell.row }} />;
                  }
                  const picked = selectedNodeIds.includes(node.id);
                  const borderClass = gradeClassMap[node.gradeFr] ?? "border-border/60";
                  const typeClass = node.type === "Start" ? "bg-gold/15 shadow-gold-glow" : node.type === "SkillLevel" ? "bg-indigo-500/10" : "bg-background/60";
                  const nodeSkill = node.type === "SkillLevel" ? getSkillForDaevanionNode(node) ?? skillById.get(String(node.effect?.skill_id ?? "")) ?? null : null;
                  const title = getNodeDisplayTitle(node, nodeSkill);
                  const subtitle = getNodeDisplaySubtitle(node);
                  const showText = viewMode === "readable" || zoomLevel >= 1.15;
                  return (
                    <button
                      key={`node-${node.id}-${cell.row}-${cell.col}`}
                      onClick={() => toggleNode(node.id)}
                      onFocus={() => setFocusedNodeId(node.id)}
                      onMouseEnter={(e) => {
                        const rect = (e.currentTarget.closest(".relative") as HTMLElement)?.getBoundingClientRect();
                        if (rect) setTooltipPos({ x: e.clientX - rect.left + 12, y: e.clientY - rect.top + 12 });
                        setHoveredNodeId(node.id);
                      }}
                      onMouseMove={(e) => {
                        const rect = (e.currentTarget.closest(".relative") as HTMLElement)?.getBoundingClientRect();
                        if (rect) setTooltipPos({ x: e.clientX - rect.left + 12, y: e.clientY - rect.top + 12 });
                      }}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      className={`rounded-md border transition p-1 ${borderClass} ${typeClass} hover:translate-y-[-1px] ${picked ? "ring-1 ring-gold/70" : ""} ${showText ? "text-left" : "text-center"}`}
                      style={{ gridColumn: cell.col, gridRow: cell.row }}
                    >
                      <div className="h-full flex flex-col items-center justify-center">
                        {node.type === "SkillLevel" && nodeSkill?.imageUrl ? (
                          <img src={nodeSkill.imageUrl} alt={nodeSkill.nameFr} className={showText ? "w-6 h-6 rounded border border-border object-cover mb-0.5 self-start" : "w-7 h-7 rounded border border-border object-cover"} loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                        ) : null}
                        {showText ? (
                          <>
                            <div className="text-[10px] font-semibold leading-tight line-clamp-2 w-full">{title}</div>
                            <div className="text-[9px] text-muted-foreground mt-0.5 w-full">{subtitle}</div>
                          </>
                        ) : (
                          <>
                            {node.type === "Stat" ? <div className="text-[9px] font-semibold leading-tight line-clamp-2">{title}</div> : null}
                            {node.type === "Start" ? <div className="text-[9px] font-semibold">Depart</div> : null}
                          </>
                        )}
                        <div className="mt-auto"><span className="inline-flex text-[8px] px-1 py-0.5 rounded border border-border bg-background/70 text-muted-foreground">{getNodeDisplayCost(node)}</span></div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {hoveredNode && (
              <div className="absolute z-20 max-w-[280px] pointer-events-none rounded-lg border border-border bg-card/95 p-2 text-xs shadow-lg" style={{ left: tooltipPos.x, top: tooltipPos.y }}>
                <div className="font-semibold">{getNodeDisplayTitle(hoveredNode, hoveredNodeSkill)}</div>
                <div className="text-muted-foreground">{getNodeDisplaySubtitle(hoveredNode)} - {getNodeDisplayCost(hoveredNode)}</div>
                <div className="mt-1 text-muted-foreground">{hoveredNode.type === "SkillLevel" && hoveredNodeSkill ? hoveredNodeSkill.descriptionFr || "Description indisponible" : hoveredNode.effectFr}</div>
              </div>
            )}
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
