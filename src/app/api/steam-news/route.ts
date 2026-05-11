import { fetchAion2SteamNews } from "../../../lib/server/steamNews";

const noStoreHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
  pragma: "no-cache",
  expires: "0",
} as const;

export async function GET(): Promise<Response> {
  try {
    const news = await fetchAion2SteamNews();
    console.info(`[steam-news] API response ready with ${news.length} item(s)`);

    return Response.json(
      {
        ok: true,
        count: news.length,
        news,
      },
      { headers: noStoreHeaders },
    );
  } catch (error) {
    console.error("[steam-news] API route failed", error);
    return Response.json(
      {
        ok: false,
        error: "Impossible de récupérer les actualités Steam pour le moment.",
      },
      { status: 500, headers: noStoreHeaders },
    );
  }
}
