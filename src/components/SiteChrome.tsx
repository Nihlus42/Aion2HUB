import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Swords } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/classes", label: "Classes" },
  { to: "/guides", label: "Guides" },
  { to: "/builds", label: "Build Planner" },
  { to: "/community", label: "Community" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Swords className="w-6 h-6 text-gold transition-transform group-hover:rotate-12" />
          <span className="font-display text-xl font-bold tracking-widest text-gradient-gold">AION 2</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-4 py-2 text-sm font-medium tracking-wide rounded-md transition-colors ${
                  active ? "text-gold bg-accent/40" : "text-muted-foreground hover:text-foreground hover:bg-accent/20"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <a
          href="https://discord.gg/lovable-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center px-4 py-2 rounded-md bg-gradient-arcane text-primary-foreground text-sm font-semibold shadow-glow hover:opacity-90 transition"
        >
          Join Discord
        </a>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border/50 px-4 py-3 flex flex-col gap-1 bg-card/95">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-md text-sm hover:bg-accent/30"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://discord.gg/lovable-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-3 py-2 rounded-md bg-gradient-arcane text-primary-foreground text-sm font-semibold text-center"
          >
            Join Discord
          </a>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/50 bg-card/40">
      <div className="container mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Swords className="w-5 h-5 text-gold" />
            <span className="font-display tracking-widest text-gradient-gold">AION 2</span>
          </div>
          <p className="text-sm text-muted-foreground">
            The unofficial fan hub for Aion 2. Guides, builds, and community for the next generation of Daevas.
          </p>
        </div>
        <div>
          <h4 className="text-gold text-sm tracking-widest mb-3">EXPLORE</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/classes" className="hover:text-foreground">Classes</Link></li>
            <li><Link to="/guides" className="hover:text-foreground">Guides</Link></li>
            <li><Link to="/builds" className="hover:text-foreground">Build Planner</Link></li>
            <li><Link to="/community" className="hover:text-foreground">Community</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gold text-sm tracking-widest mb-3">COMMUNITY</h4>
          <p className="text-sm text-muted-foreground mb-3">Join thousands of Daevas in our Discord.</p>
          <a href="https://discord.gg/lovable-dev" target="_blank" rel="noopener noreferrer"
             className="inline-block px-4 py-2 rounded-md bg-gradient-arcane text-primary-foreground text-sm font-semibold">
            Join Discord
          </a>
        </div>
      </div>
      <div className="border-t border-border/50 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Aion 2 Hub — Fan-made site, not affiliated with NCSOFT.
      </div>
    </footer>
  );
}
