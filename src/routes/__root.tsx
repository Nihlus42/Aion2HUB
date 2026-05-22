import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

import appCss from "../styles.css?url";

const SITE_URL = "https://aion2frenchub.vercel.app";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/updates/steam-aion2.png`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-gradient-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Perdu dans l’Abyss</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette page a dérapé dans la faille. Reviens vers une zone sûre.
        </p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-md bg-gradient-arcane px-4 py-2 text-sm font-semibold text-primary-foreground">
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Une faille s&apos;est ouverte</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-gradient-arcane px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AION 2 FR - Actualités, classes, compétences et builds | Aion2FrenchHub" },
      {
        name: "description",
        content:
          "Aion2FrenchHub centralise les actualités AION 2 en français, les classes, les compétences, les builds et les outils utiles pour suivre le MMORPG de NCSoft.",
      },
      {
        name: "keywords",
        content:
          "AION 2, AION 2 FR, AION 2 français, actualités AION 2, classes AION 2, compétences AION 2, build AION 2, guide AION 2",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: "Aion 2 Hub" },
      {
        property: "og:description",
        content: "Actualités AION 2 en français, classes, compétences, builds et outils utiles pour suivre le MMORPG de NCSoft.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { property: "og:site_name", content: "Aion2FrenchHub" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AION 2 FR - Actualités, classes, compétences et builds" },
      {
        name: "twitter:description",
        content: "Le hub fan AION 2 en français pour suivre les news, classes, compétences et outils utiles.",
      },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE_URL },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Aion2FrenchHub",
              alternateName: "Aion 2 Hub",
              url: SITE_URL,
              inLanguage: "fr-FR",
              description:
                "Hub fan AION 2 en français avec actualités vérifiées, classes, compétences et outils de planification.",
              publisher: {
                "@type": "Organization",
                name: "Aion2FrenchHub",
                url: SITE_URL,
                logo: DEFAULT_OG_IMAGE,
              },
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1"><Outlet /></main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}



