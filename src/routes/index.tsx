import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, Sword, Shield, ArrowRight, Calendar } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { guides, classes } from "@/data";
import { RuneDivider, Eyebrow } from "@/components/Ornament";
import { EventTimers } from "@/components/EventTimers";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aion 2 Hub — Dark Fantasy MMORPG Utility Hub" },
      { name: "description", content: "Class guides, build planner, and event timers for Aion 2 players." },
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
              Class guides crafted by veterans. A live build planner. Event timers and tools that actually help.
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

      <EventTimers />

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
      <section className="container mx-auto px-4 py-24">
        <RuneDivider className="mb-12" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Sword, title: "8 Iconic Classes", desc: "Detailed class breakdowns with role, difficulty, and signature skills.", to: "/classes" as const },
            { icon: Shield, title: "Builds That Win", desc: "Plan stigmas, share builds, and copy proven setups in one click.", to: "/builds" as const },
            { icon: Calendar, title: "Track Event Timers", desc: "Keep your runs on schedule with live placeholder reset timers.", to: "/builds" as const },
          ].map((f, i) => (
            <Link
              key={f.title}
              to={f.to}
              className="group rune-border rune-border-hover rounded-xl p-7 animate-fade-up relative overflow-hidden"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gold/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-lg bg-gradient-arcane flex items-center justify-center mb-5 shadow-glow group-hover:animate-pulse-glow">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl mb-2 group-hover:text-gold transition-colors">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              <div className="mt-5 inline-flex items-center text-sm text-primary group-hover:text-gold transition-colors">
                Explore <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest news */}
      <section className="container mx-auto px-4 pb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <Eyebrow>CHRONICLES</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl">Latest Guides</h2>
          </div>
          <Link to="/guides" className="text-sm text-primary hover:text-gold transition-colors group">
            View all <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {latest.map((g, i) => (
            <article
              key={g.id}
              className="rune-border rune-border-hover rounded-xl overflow-hidden flex flex-col group cursor-pointer animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="h-36 bg-gradient-arcane relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.85_0.15_85/0.4),transparent_60%)] group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,oklch(0.16_0.04_265/0.6))]" />
                <span className="absolute top-3 left-3 px-2 py-1 text-[10px] tracking-[0.25em] bg-background/80 text-gold rounded border border-gold/30 backdrop-blur">
                  {g.category.toUpperCase()}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display text-lg mb-2 leading-tight group-hover:text-gold transition-colors">{g.title}</h3>
                <p className="text-sm text-muted-foreground flex-1 leading-relaxed">{g.excerpt}</p>
                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                  <span>By <span className="text-foreground/80">{g.author}</span></span>
                  <span>{g.readTime} min read</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24">
        <div className="rune-border rounded-2xl p-10 md:p-16 text-center bg-gradient-to-br from-card to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.72_0.18_240/0.3),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,oklch(0.82_0.15_85/0.15),transparent_60%)]" />
          <svg className="absolute top-6 left-6 w-20 h-20 text-gold/15 animate-rune-spin" viewBox="0 0 100 100" aria-hidden>
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 5" />
          </svg>
          <svg className="absolute bottom-6 right-6 w-20 h-20 text-gold/15 animate-rune-spin" style={{ animationDirection: "reverse" }} viewBox="0 0 100 100" aria-hidden>
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 5" />
          </svg>
          <div className="relative">
            <Sparkles className="w-10 h-10 text-gold mx-auto mb-4 animate-float-slow" />
            <h2 className="font-display text-3xl md:text-5xl mb-4">Join {classes.length}+ Class Discussions</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Theorycraft faster with curated guides, practical build planning, and always-visible timer tools.
            </p>
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-gradient-arcane text-primary-foreground font-semibold shadow-glow hover:shadow-gold-glow hover:scale-[1.03] transition-all"
            >
              Browse Guides
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}


