import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Gamepad2, Keyboard, Languages, Maximize2, Zap } from "lucide-react";
import { Eyebrow, RuneDivider } from "@/components/Ornament";

export const Route = createFileRoute("/nebula-heaven")({
  head: () => ({
    meta: [
      { title: "Nebula Heaven - jeu navigateur | Aion2FrenchHub" },
      {
        name: "description",
        content:
          "Teste Nebula Heaven directement dans ton navigateur : shooter spatial jouable au clavier avec flèches, Espace et P.",
      },
    ],
  }),
  component: NebulaHeavenPage,
});

function NebulaHeavenPage() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const focusGame = () => {
    frameRef.current?.focus();
  };

  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <section className="relative overflow-hidden rune-border rounded-2xl p-6 md:p-8 shadow-elevated">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/10 to-gold/10" />
        <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <Eyebrow>
              <Gamepad2 className="h-3.5 w-3.5" /> TEST JOUABLE
            </Eyebrow>
            <h1 className="mt-3 font-display text-4xl md:text-6xl text-gradient-gold">
              Nebula Heaven
            </h1>
            <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
              Prototype arcade exporté depuis Godot. Clique dans la fenêtre de jeu ou utilise le
              bouton d’activation, puis joue au clavier.
            </p>
          </div>
          <div className="rounded-xl border border-gold/25 bg-background/70 p-5">
            <div className="flex items-center gap-2 text-gold text-sm tracking-[0.25em]">
              <Keyboard className="h-4 w-4" /> CONTROLES
            </div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="text-foreground">Flèches directionnelles</span> : déplacer le
                vaisseau
              </li>
              <li>
                <span className="text-foreground">Espace</span> : déclencher le Pulse quand il est
                chargé
              </li>
              <li>
                <span className="text-foreground">P</span> : pause / reprise
              </li>
            </ul>
            <button
              type="button"
              onClick={focusGame}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-arcane px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
            >
              <Zap className="h-4 w-4" /> Activer les contrôles
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8 overflow-hidden rounded-2xl border border-gold/25 bg-black shadow-elevated">
        <div className="flex items-center justify-between border-b border-gold/20 bg-card/80 px-4 py-3">
          <div className="text-sm font-semibold tracking-[0.22em] text-gold">
            NEBULA HEAVEN WEB BUILD
          </div>
          <a
            href="/nebula-heaven/game/index.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold transition hover:bg-gold/10"
          >
            <Maximize2 className="h-3.5 w-3.5" /> Plein onglet
          </a>
        </div>
        <div className="aspect-[9/16] max-h-[82vh] w-full bg-black md:aspect-[16/10]">
          <iframe
            ref={frameRef}
            title="Nebula Heaven playable web build"
            src="/nebula-heaven/game/index.html"
            className="h-full w-full border-0"
            allow="fullscreen; autoplay"
            tabIndex={0}
          />
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="rune-border rounded-xl p-6">
          <Eyebrow>
            <Languages className="h-3.5 w-3.5" /> FRANCAIS
          </Eyebrow>
          <h2 className="mt-3 font-display text-2xl">Survivre au flux ennemi</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Nebula Heaven est un shooter arcade vertical : esquive les vagues, détruis les ennemis,
            récupère les bonus et tiens le plus loin possible. La sauvegarde et les scores restent
            locaux au navigateur pour cette version de test.
          </p>
        </article>
        <article className="rune-border rounded-xl p-6">
          <Eyebrow>
            <Languages className="h-3.5 w-3.5" /> ENGLISH
          </Eyebrow>
          <h2 className="mt-3 font-display text-2xl">Survive the enemy stream</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Nebula Heaven is a vertical arcade shooter: dodge waves, destroy enemies, collect
            upgrades and push the run as far as you can. Saves and scores are stored locally in the
            browser for this test version.
          </p>
        </article>
      </section>

      <RuneDivider className="mt-12" />
    </div>
  );
}
