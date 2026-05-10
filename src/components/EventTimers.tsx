import { useEffect, useMemo, useState } from "react";
import {
  DailyResetIcon,
  RiftIcon,
  ShugoIcon,
  WeeklyResetIcon,
} from "@/components/EventTimerIcons";
import { eventTimers, type EventTimerDefinition } from "@/data";

type Countdown = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getNextOccurrence(now: Date, cfg: EventTimerDefinition["schedule"]): Date {
  if (cfg.type === "daily") {
    const next = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        cfg.hourUtc,
        cfg.minuteUtc,
        0,
      ),
    );
    if (next.getTime() <= now.getTime()) {
      next.setUTCDate(next.getUTCDate() + 1);
    }
    return next;
  }

  const targetWeekday = cfg.weekdayUtc ?? 0;
  const currentWeekday = now.getUTCDay();
  let daysUntil = (targetWeekday - currentWeekday + 7) % 7;

  const next = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      cfg.hourUtc,
      cfg.minuteUtc,
      0,
    ),
  );
  next.setUTCDate(next.getUTCDate() + daysUntil);

  if (next.getTime() <= now.getTime()) {
    daysUntil = daysUntil + 7;
    next.setUTCDate(next.getUTCDate() + 7);
  }

  return next;
}

function getCountdown(nowMs: number, target: Date): Countdown {
  const totalMs = Math.max(0, target.getTime() - nowMs);
  const days = Math.floor(totalMs / 86_400_000);
  const hours = Math.floor((totalMs / 3_600_000) % 24);
  const minutes = Math.floor((totalMs / 60_000) % 60);
  const seconds = Math.floor((totalMs / 1_000) % 60);
  return { totalMs, days, hours, minutes, seconds };
}

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

function getTimerIcon(name: EventTimerDefinition["icon"]) {
  if (name === "rift") return RiftIcon;
  if (name === "daily") return DailyResetIcon;
  if (name === "weekly") return WeeklyResetIcon;
  return ShugoIcon;
}

export function EventTimers() {
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timers = useMemo(
    () =>
      eventTimers.map((cfg) => {
        const now = new Date(nowMs);
        const target = getNextOccurrence(now, cfg.schedule);
        const countdown = getCountdown(nowMs, target);
        return { cfg, countdown };
      }),
    [nowMs],
  );

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="font-display text-2xl md:text-3xl">Timers d evenements</h2>
        <span className="text-[11px] tracking-[0.2em] text-gold/90 uppercase">
          Horaires provisoires et susceptibles de changer
        </span>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {timers.map(({ cfg, countdown }) => (
          <article key={cfg.id} className="rune-border rune-border-hover rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              {(() => {
                const Icon = getTimerIcon(cfg.icon);
                return (
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-background/70 border border-gold/20 flex items-center justify-center shadow-[0_0_20px_-6px_oklch(0.72_0.18_240/0.55)]">
                    <Icon className="w-9 h-9 md:w-10 md:h-10 text-gold drop-shadow-[0_0_8px_oklch(0.82_0.15_85/0.6)]" />
                  </div>
                );
              })()}
              <div className="min-w-0">
                <div className="text-gold text-xs tracking-[0.2em] uppercase mb-1">{cfg.title}</div>
                <p className="text-xs text-muted-foreground">{cfg.description}</p>
              </div>
            </div>
            <div className="mb-4" />

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "D", value: countdown.days },
                { label: "H", value: countdown.hours },
                { label: "M", value: countdown.minutes },
                { label: "S", value: countdown.seconds },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="rounded-md border border-gold/20 bg-background/70 px-2 py-2 text-center"
                >
                  <div className="font-display text-lg text-gradient-gold tabular-nums">
                    {pad2(unit.value)}
                  </div>
                  <div className="text-[10px] tracking-[0.2em] text-muted-foreground">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
