import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, Sword, Shield, ArrowRight, Calendar } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { classes } from "@/data";
import { RuneDivider, Eyebrow } from "@/components/Ornament";
import { EventTimers } from "@/components/EventTimers";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aion 2 Hub - Hub utilitaire MMORPG dark fantasy" },
      { name: "description", content: "Actualites, classes, competences, planificateur et timers d evenements pour les joueurs Aion 2." },
    ],
  }),
  component: HomePage,
});

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function HomePage() {
  const target = new Date(Date.UTC(2026, 5, 5, 21, 0, 0));
  const { days, hours, minutes, seconds } = useCountdown(target);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Aion 2 hero" width={1920} height={1024} className="w-full h-full object-cover opacity-60 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute bottom-0 w-1 h-1 rounded-full bg-gold/70 animate-ember"
              style={{
                left: `${(i * 8 + 5) % 100}%`,
                animationDelay: `${(i * 0.4) % 4}s`,
                animationDuration: `${4 + (i % 3)}s`,
              }}
            />
          ))}
        </div>
        <div className="container mx-auto px-4 pt-24 pb-36 relative">
          <div className="max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/60 border border-gold/30 mb-6 backdrop-blur">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
              <span className="text-xs tracking-[0.3em] text-gold font-medium">UNION DES DAEVAS</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05]">
              Eleve-toi dans <span className="shimmer-text">Aion 2</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Actualites verifiees, classes, competences, planificateur de build et timers vraiment utiles.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/updates" className="px-6 py-3 rounded-md bg-gradient-arcane text-primary-foreground font-semibold shadow-glow hover:shadow-gold-glow hover:scale-[1.03] transition-all inline-flex items-center gap-2">
                Voir les actualites <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/builds" className="px-6 py-3 rounded-md border border-gold/40 text-gold font-semibold hover:bg-gold/10 hover:border-gold transition-all">
                Ouvrir le planificateur
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EventTimers />

      <section className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="rune-border rune-border-hover rounded-2xl p-8 shadow-elevated relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative">
            <div>
              <Eyebrow><Calendar className="w-3.5 h-3.5" /> PROCHAINE GRANDE ACTU</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl">Summer Game Fest - 5 juin</h2>
              <p className="text-sm text-muted-foreground mt-1">Fenetre d annonce attendue pour les prochaines infos Aion 2.</p>
            </div>
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {[
                { v: days, l: "Jours" },
                { v: hours, l: "Heures" },
                { v: minutes, l: "Minutes" },
                { v: seconds, l: "Secondes" },
              ].map((u) => (
                <div key={u.l} className="text-center bg-background/70 border border-gold/20 rounded-lg px-3 py-3 md:px-5 md:py-4 min-w-[64px]">
                  <div className="font-display text-2xl md:text-4xl text-gradient-gold tabular-nums">{String(u.v).padStart(2, "0")}</div>
                  <div className="text-[10px] md:text-xs tracking-[0.25em] text-muted-foreground mt-1">{u.l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <RuneDivider className="mb-12" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Sword, title: "8 classes iconiques", desc: "Details des classes avec role, difficulte et competences signatures.", to: "/classes" as const },
            { icon: Shield, title: "Planificateur Daevanion", desc: "Construit ton plateau, gere les points et optimise tes noeuds.", to: "/daevanion-planner" as const },
            { icon: Calendar, title: "Suivi des updates", desc: "Reste cale sur les annonces officielles et infos verifiees.", to: "/updates" as const },
          ].map((f, i) => (
            <Link
              key={f.title}
              to={f.to}
              className="group rune-border rune-border-hover rounded-xl p-7 animate-fade-up relative overflow-hidden"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-arcane flex items-center justify-center mb-5 shadow-glow">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl mb-2 group-hover:text-gold transition-colors">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              <div className="mt-5 inline-flex items-center text-sm text-primary group-hover:text-gold transition-colors">
                Explorer <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="rune-border rounded-2xl p-10 md:p-16 text-center bg-gradient-to-br from-card to-background relative overflow-hidden">
          <div className="relative">
            <Sparkles className="w-10 h-10 text-gold mx-auto mb-4 animate-float-slow" />
            <h2 className="font-display text-3xl md:text-5xl mb-4">Explore les skills des classes</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Theorycraft plus vite avec les classes, competences, updates et un planificateur pratique.
            </p>
            <Link
              to="/classes"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-gradient-arcane text-primary-foreground font-semibold shadow-glow hover:shadow-gold-glow hover:scale-[1.03] transition-all"
            >
              Explorer les classes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
