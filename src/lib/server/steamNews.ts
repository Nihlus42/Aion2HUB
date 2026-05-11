const STEAM_NEWS_ENDPOINT =
  "https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=3393110&count=10&maxlength=0&format=json";

type SteamNewsItem = {
  gid?: string;
  title?: string;
  url?: string;
  contents?: string;
  date?: number;
  author?: string;
  feedlabel?: string;
  feedname?: string;
};

type SteamNewsResponse = {
  appnews?: {
    newsitems?: SteamNewsItem[];
  };
};

export type NormalizedSteamNewsItem = {
  id: string;
  source: "steam";
  sourceUrl: string;
  titleOriginal: string;
  contentOriginal: string;
  publishedAt: string;
  author?: string;
  tags: string[];
  status: "detected";
};

export type NormalizedSteamNews = NormalizedSteamNewsItem;

function toNormalizedNewsItem(item: SteamNewsItem): NormalizedSteamNewsItem | null {
  if (!item.gid || !item.url || !item.title || !item.contents || typeof item.date !== "number") {
    return null;
  }

  const tags = [item.feedlabel, item.feedname].filter((value): value is string => Boolean(value?.trim()));

  return {
    id: item.gid,
    source: "steam",
    sourceUrl: item.url,
    titleOriginal: item.title,
    contentOriginal: item.contents,
    publishedAt: new Date(item.date * 1000).toISOString(),
    author: item.author?.trim() || undefined,
    tags,
    status: "detected",
  };
}

export async function fetchAion2SteamNews(): Promise<NormalizedSteamNewsItem[]> {
  let response: Response;
  try {
    response = await fetch(STEAM_NEWS_ENDPOINT, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
  } catch (error) {
    console.error("[steam-news] Network error while fetching Steam news", error);
    throw new Error("steam_news_fetch_failed");
  }

  if (!response.ok) {
    console.error("[steam-news] Steam API returned non-OK response", { status: response.status });
    throw new Error("steam_news_fetch_failed");
  }

  let payload: SteamNewsResponse;
  try {
    payload = (await response.json()) as SteamNewsResponse;
  } catch (error) {
    console.error("[steam-news] Failed to parse Steam API JSON payload", error);
    throw new Error("steam_news_invalid_payload");
  }

  const newsItems = payload.appnews?.newsitems;
  if (!Array.isArray(newsItems)) {
    console.error("[steam-news] Missing appnews.newsitems in Steam payload");
    throw new Error("steam_news_invalid_payload");
  }

  const normalizedNews = newsItems
    .map(toNormalizedNewsItem)
    .filter((item): item is NormalizedSteamNewsItem => item !== null);

  console.info(`[steam-news] Retrieved ${normalizedNews.length} normalized news item(s)`);
  return normalizedNews;
}
