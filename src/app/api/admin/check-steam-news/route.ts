import { sendDiscordNotification } from "../../../../lib/server/notifyDiscord";
import { createSteamExcerpt } from "../../../../lib/server/steamContentCleaner";
import { fetchAion2SteamNews } from "../../../../lib/server/steamNews";
import {
  hasSeenSteamNews,
  isSteamNewsStoreConfigured,
  markManySteamNewsAsSeen,
  markSteamNewsAsSeen,
} from "../../../../lib/server/steamNewsStore";

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
  pragma: "no-cache",
  expires: "0",
} as const;

function isTrueQueryFlag(value: string | null): boolean {
  if (!value) return false;
  return value === "1" || value.toLowerCase() === "true";
}

export async function POST(request: Request): Promise<Response> {
  const expectedSecret = process.env.ADMIN_SECRET?.trim();
  const receivedSecret = request.headers.get("x-admin-secret")?.trim();

  if (!expectedSecret || receivedSecret !== expectedSecret) {
    return Response.json(
      {
        ok: false,
        error: "Non autorisé",
      },
      { status: 401, headers: jsonHeaders },
    );
  }

  const requestUrl = new URL(request.url);
  const bootstrap = isTrueQueryFlag(requestUrl.searchParams.get("bootstrap"));
  const dryRun = isTrueQueryFlag(requestUrl.searchParams.get("dryRun"));
  const mode = bootstrap ? "bootstrap" : dryRun ? "dryRun" : "normal";
  const storageConfigured = isSteamNewsStoreConfigured();

  console.info("[admin-check-steam-news] Steam news check started");
  console.info(`[admin-check-steam-news] Mode: ${mode}`);
  console.info(`[admin-check-steam-news] Storage configured: ${storageConfigured}`);

  try {
    const newsList = await fetchAion2SteamNews();
    console.info(`[admin-check-steam-news] Retrieved ${newsList.length} steam news item(s)`);

    if (bootstrap) {
      const markedAsSeen = await markManySteamNewsAsSeen(newsList);
      console.info(`[admin-check-steam-news] Bootstrap mode marked ${markedAsSeen} item(s) as seen`);
      return Response.json(
        {
          ok: true,
          mode,
          checked: newsList.length,
          markedAsSeen,
          notified: 0,
        },
        { headers: jsonHeaders },
      );
    }

    const newNews = [];
    let skipped = 0;
    let notified = 0;

    for (const news of newsList) {
      const seen = await hasSeenSteamNews(news.id);
      if (seen) {
        skipped += 1;
        continue;
      }

      newNews.push({
        id: news.id,
        titleOriginal: news.titleOriginal,
        sourceUrl: news.sourceUrl,
        publishedAt: news.publishedAt,
      });

      if (dryRun) continue;

      const excerpt = createSteamExcerpt(news.contentOriginal, 350);
      const fields = [
        { name: "Titre", value: news.titleOriginal },
        { name: "Source", value: "Steam officielle" },
        { name: "Date", value: news.publishedAt },
        { name: "Statut", value: "À vérifier / à traduire manuellement" },
      ];

      if (excerpt) fields.push({ name: "Extrait", value: excerpt });

      await sendDiscordNotification({
        title: "📰 Nouvelle actualité Steam détectée",
        description: "Nouvelle actualité AION 2 détectée sur Steam. Traduction manuelle requise avant publication.",
        url: news.sourceUrl || undefined,
        fields,
      });

      await markSteamNewsAsSeen(news);
      notified += 1;
      console.info(`[admin-check-steam-news] Notified and marked id=${news.id} title="${news.titleOriginal}"`);
    }

    return Response.json(
      {
        ok: true,
        checked: newsList.length,
        newItems: newNews.length,
        notified,
        skipped,
        mode,
        newNews,
      },
      { headers: jsonHeaders },
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Stockage anti-doublon non configuré.") {
      console.warn("[admin-check-steam-news] Controlled error: anti-duplicate store not configured");
      return Response.json(
        {
          ok: false,
          error:
            "Stockage anti-doublon non configuré. Configure UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN.",
        },
        { status: 500, headers: jsonHeaders },
      );
    }

    console.error("[admin-check-steam-news] Route failed", error);
    return Response.json(
      {
        ok: false,
        error: "Impossible de vérifier les actualités Steam pour le moment.",
      },
      { status: 500, headers: jsonHeaders },
    );
  }
}
