import { sendDiscordNotification } from "../../../../lib/server/notifyDiscord";
import { createSteamExcerpt } from "../../../../lib/server/steamContentCleaner";
import { fetchAion2SteamNews } from "../../../../lib/server/steamNews";
import { hasSeenSteamNews, isSteamNewsStoreConfigured, markSteamNewsAsSeen } from "../../../../lib/server/steamNewsStore";

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
  pragma: "no-cache",
  expires: "0",
} as const;

export async function GET(request: Request): Promise<Response> {
  const expectedSecret = process.env.CRON_SECRET?.trim();
  const authHeader = request.headers.get("authorization")?.trim();
  const receivedSecret = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : "";

  if (!expectedSecret || receivedSecret !== expectedSecret) {
    return Response.json(
      {
        ok: false,
        error: "Non autorisé",
      },
      { status: 401, headers: jsonHeaders },
    );
  }

  const storageConfigured = isSteamNewsStoreConfigured();
  console.info("[cron-steam-news] Steam news cron started");
  console.info(`[cron-steam-news] Storage configured: ${storageConfigured}`);

  try {
    const newsList = await fetchAion2SteamNews();
    console.info(`[cron-steam-news] Retrieved ${newsList.length} steam news item(s)`);

    let skipped = 0;
    let newItems = 0;
    let notified = 0;

    for (const news of newsList) {
      const seen = await hasSeenSteamNews(news.id);
      if (seen) {
        skipped += 1;
        continue;
      }

      newItems += 1;
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
      console.info(`[cron-steam-news] Notified and marked id=${news.id} title="${news.titleOriginal}"`);
    }

    return Response.json(
      {
        ok: true,
        checked: newsList.length,
        newItems,
        notified,
        skipped,
        mode: "cron",
      },
      { headers: jsonHeaders },
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Stockage anti-doublon non configuré.") {
      console.warn("[cron-steam-news] Controlled error: anti-duplicate store not configured");
      return Response.json(
        {
          ok: false,
          error:
            "Stockage anti-doublon non configuré. Configure UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN.",
        },
        { status: 500, headers: jsonHeaders },
      );
    }

    console.error("[cron-steam-news] Route failed", error);
    return Response.json(
      {
        ok: false,
        error: "Impossible de vérifier les actualités Steam pour le moment.",
      },
      { status: 500, headers: jsonHeaders },
    );
  }
}
