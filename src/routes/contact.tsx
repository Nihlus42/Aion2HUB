import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";

const mailtoHref = "mailto:aion2frenchhub@proton.me?subject=Contact%20Aion2HUB";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Aion 2 Hub" },
      { name: "description", content: "Page de contact Aion2HUB." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-14">
      <div className="max-w-3xl mx-auto rune-border rounded-xl p-6 md:p-8 space-y-6">
        <header className="space-y-2">
          <h1 className="font-display text-4xl">Contact</h1>
          <p className="text-muted-foreground">
            Une question, une correction ou une suggestion pour Aion2HUB ?
          </p>
        </header>

        <section className="rounded-lg border border-border/60 bg-background/40 p-4">
          <p className="text-sm text-muted-foreground">
            Tu peux nous contacter par email pour signaler une erreur, proposer une amélioration, partager une information utile ou poser une question liée au projet.
          </p>
          <div className="mt-4 text-base font-medium">aion2frenchhub@proton.me</div>
          <a
            href={mailtoHref}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-arcane text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
          >
            <Mail className="w-4 h-4" />
            Envoyer un email
          </a>
        </section>

        <section className="rounded-lg border border-border/60 bg-background/40 p-4">
          <h2 className="font-display text-xl mb-2">Pour quoi nous contacter ?</h2>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Signaler une erreur dans une donnée</li>
            <li>Proposer une amélioration du site</li>
            <li>Suggérer une traduction</li>
            <li>Partager une information utile sur Aion 2</li>
            <li>Signaler un bug</li>
          </ul>
        </section>

        <section className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-4">
          <h2 className="font-display text-xl mb-2">Important</h2>
          <p className="text-sm text-amber-100/90">
            Merci de ne pas envoyer d informations personnelles sensibles. Aion2HUB est un projet fan non officiel.
          </p>
        </section>

        <section className="rounded-lg border border-border/60 bg-background/40 p-4">
          <h2 className="font-display text-xl mb-2">Projet non officiel</h2>
          <p className="text-sm text-muted-foreground">
            Aion 2 et les assets associés appartiennent à NCSoft. Aion2HUB est un projet fan non officiel.
          </p>
        </section>
      </div>
    </div>
  );
}
