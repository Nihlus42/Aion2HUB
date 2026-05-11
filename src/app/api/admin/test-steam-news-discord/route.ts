import { sendDiscordNotification } from "../../../../lib/server/notifyDiscord";
import { createSteamExcerpt } from "../../../../lib/server/steamContentCleaner";
import { fetchAion2SteamNews } from "../../../../lib/server/steamNews";

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
  pragma: "no-cache",
  expires: "0",
} as const;

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

  try {
    const newsList = await fetchAion2SteamNews();
    console.info(`[admin-test-steam-news-discord] Retrieved ${newsList.length} steam news item(s)`);

    const latestNews = newsList[0];
    if (!latestNews) {
      return Response.json(
        {
          ok: false,
          error: "Aucune actualité Steam trouvée.",
        },
        { headers: jsonHeaders },
      );
    }

    const excerpt = createSteamExcerpt(latestNews.contentOriginal, 350);
    const fields = [
      { name: "Titre", value: latestNews.titleOriginal },
      { name: "Source", value: "Steam officielle" },
      { name: "Date", value: latestNews.publishedAt },
      { name: "Statut", value: "À vérifier avant publication" },
    ];

    if (excerpt) {
      fields.push({ name: "Extrait", value: excerpt });
    }

    await sendDiscordNotification({
      title: "📰 Nouvelle actualité Steam détectée",
      description: "Une actualité AION 2 a été récupérée depuis Steam.",
      url: latestNews.sourceUrl || undefined,
      fields,
    });

    console.info(
      `[admin-test-steam-news-discord] Sent Discord notification for news id=${latestNews.id} title="${latestNews.titleOriginal}"`,
    );

    return Response.json(
      {
        ok: true,
        message: "Notification Steam envoyée sur Discord.",
        news: {
          id: latestNews.id,
          titleOriginal: latestNews.titleOriginal,
          sourceUrl: latestNews.sourceUrl,
          publishedAt: latestNews.publishedAt,
        },
      },
      { headers: jsonHeaders },
    );
  } catch (error) {
    console.error("[admin-test-steam-news-discord] Route failed", error);
    return Response.json(
      {
        ok: false,
        error: "Impossible d'envoyer la notification Steam sur Discord pour le moment.",
      },
      { status: 500, headers: jsonHeaders },
    );
  }
}
