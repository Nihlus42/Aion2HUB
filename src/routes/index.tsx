import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, Sword, Shield, Users, ArrowRight, Calendar } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { guides, classes } from "@/data/aion";
import { RuneDivider, Eyebrow } from "@/components/Ornament";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aion 2 Hub — Dark Fantasy MMORPG Community" },
      { name: "description", content: "Class guides, build planner, and guild finder for Aion 2 players." },
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
  // Countdown to a future patch / launch event
  const target = new Date(Date.UTC(2026, 11, 1, 17, 0, 0));
  const { days, hours, minutes, seconds } = useCountdown(target);
  const latest = guides.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Aion 2 hero" width={1920} height={1024} className="w-full h-full object-cover opacity-60 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
          {/* Floating embers */}
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
          {/* Spinning rune accent */}
          <svg className="absolute top-10 right-10 w-40 h-40 text-gold/15 animate-rune-spin hidden lg:block" viewBox="0 0 100 100" aria-hidden>
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M50 5 L52 45 L90 50 L52 55 L50 95 L48 55 L10 50 L48 45 Z" fill="currentColor" opacity="0.4" />
          </svg>
        </div>
        <div className="container mx-auto px-4 pt-24 pb-36 relative">
          <div className="max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/60 border border-gold/30 mb-6 backdrop-blur">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
              <span className="text-xs tracking-[0.3em] text-gold font-medium">DAEVAS UNITE</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05]">
              Ascend in <span className="shimmer-text">Aion 2</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Class guides crafted by veterans. A live build planner. A guild finder that actually works.
              Everything you need to dominate Atreia — in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/guides" className="px-6 py-3 rounded-md bg-gradient-arcane text-primary-foreground font-semibold shadow-glow hover:shadow-gold-glow hover:scale-[1.03] transition-all inline-flex items-center gap-2">
                Browse Guides <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/builds" className="px-6 py-3 rounded-md border border-gold/40 text-gold font-semibold hover:bg-gold/10 hover:border-gold transition-all">
                Open Build Planner
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="rune-border rune-border-hover rounded-2xl p-8 shadow-elevated relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative">
            <div>
              <Eyebrow><Calendar className="w-3.5 h-3.5" /> NEXT MAJOR PATCH</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl">Echoes of Beritra</h2>
              <p className="text-sm text-muted-foreground mt-1">New zone, raid tier, and stigma overhaul.</p>
            </div>
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {[
                { v: days, l: "Days" },
                { v: hours, l: "Hours" },
                { v: minutes, l: "Minutes" },
                { v: seconds, l: "Seconds" },
              ].map((u) => (
                <div key={u.l} className="text-center bg-background/70 border border-gold/20 rounded-lg px-3 py-3 md:px-5 md:py-4 min-w-[64px] hover:border-gold/50 transition-colors">
                  <div className="font-display text-2xl md:text-4xl text-gradient-gold tabular-nums drop-shadow-[0_0_15px_oklch(0.82_0.15_85/0.4)]">{String(u.v).padStart(2, "0")}</div>
                  <div className="text-[10px] md:text-xs tracking-[0.25em] text-muted-foreground mt-1">{u.l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Sword, title: "8 Iconic Classes", desc: "Detailed class breakdowns with role, difficulty, and signature skills.", to: "/classes" as const },
            { icon: Shield, title: "Builds That Win", desc: "Plan stigmas, share builds, and copy proven setups in one click.", to: "/builds" as const },
            { icon: Users, title: "Find Your Legion", desc: "Browse recruiting guilds across factions, regions, and play styles.", to: "/community" as const },
          ].map((f) => (
            <Link key={f.title} to={f.to} className="group rune-border rounded-xl p-6 hover:shadow-glow transition-all">
              <f.icon className="w-8 h-8 text-gold mb-4" />
              <h3 className="font-display text-xl mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
              <div className="mt-4 inline-flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest news */}
      <section className="container mx-auto px-4 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-gold text-xs tracking-widest mb-2">CHRONICLES</div>
            <h2 className="font-display text-3xl md:text-4xl">Latest Guides</h2>
          </div>
          <Link to="/guides" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {latest.map((g) => (
            <article key={g.id} className="rune-border rounded-xl overflow-hidden flex flex-col hover:shadow-glow transition">
              <div className="h-32 bg-gradient-arcane relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.85_0.15_85/0.3),transparent_60%)]" />
                <span className="absolute top-3 left-3 px-2 py-1 text-[10px] tracking-widest bg-background/70 text-gold rounded">
                  {g.category.toUpperCase()}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display text-lg mb-2 leading-tight">{g.title}</h3>
                <p className="text-sm text-muted-foreground flex-1">{g.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>By {g.author}</span>
                  <span>{g.readTime} min read</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="rune-border rounded-2xl p-10 md:p-14 text-center bg-gradient-to-br from-card to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.72_0.18_240/0.25),transparent_60%)]" />
          <div className="relative">
            <Sparkles className="w-8 h-8 text-gold mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-5xl mb-4">Join {classes.length}+ Class Discussions</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Real-time theorycrafting, LFG channels for every dungeon, and weekly community events.
            </p>
            <a
              href="https://discord.gg/lovable-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-gradient-arcane text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition"
            >
              Join the Discord
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
