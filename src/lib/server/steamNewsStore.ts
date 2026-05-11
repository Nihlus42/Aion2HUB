import type { NormalizedSteamNews } from "./steamNews";

type SeenSteamNewsRecord = {
  id: string;
  titleOriginal: string;
  sourceUrl: string;
  publishedAt: string;
  firstSeenAt: string;
};

type UpstashResponse<T> = {
  result: T;
};

const STORE_NOT_CONFIGURED_MESSAGE = "Stockage anti-doublon non configuré.";

function getRedisConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  return { url, token };
}

export function isSteamNewsStoreConfigured(): boolean {
  return getRedisConfig() !== null;
}

function getSeenKey(id: string): string {
  return `aion2hub:steam-news:seen:${id}`;
}

async function upstashGet(key: string): Promise<string | null> {
  const config = getRedisConfig();
  if (!config) throw new Error(STORE_NOT_CONFIGURED_MESSAGE);

  const response = await fetch(`${config.url}/get/${encodeURIComponent(key)}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("[steam-news-store] Upstash GET failed", { status: response.status });
    throw new Error("steam_news_store_error");
  }

  const payload = (await response.json()) as UpstashResponse<string | null>;
  return payload.result ?? null;
}

async function upstashSet(key: string, value: string): Promise<void> {
  const config = getRedisConfig();
  if (!config) throw new Error(STORE_NOT_CONFIGURED_MESSAGE);

  const response = await fetch(
    `${config.url}/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    console.error("[steam-news-store] Upstash SET failed", { status: response.status });
    throw new Error("steam_news_store_error");
  }
}

export async function hasSeenSteamNews(id: string): Promise<boolean> {
  if (!id) return false;
  const value = await upstashGet(getSeenKey(id));
  return value !== null;
}

export async function markSteamNewsAsSeen(news: NormalizedSteamNews): Promise<void> {
  const record: SeenSteamNewsRecord = {
    id: news.id,
    titleOriginal: news.titleOriginal,
    sourceUrl: news.sourceUrl,
    publishedAt: news.publishedAt,
    firstSeenAt: new Date().toISOString(),
  };

  await upstashSet(getSeenKey(news.id), JSON.stringify(record));
}

export async function markManySteamNewsAsSeen(newsItems: NormalizedSteamNews[]): Promise<number> {
  let marked = 0;
  for (const news of newsItems) {
    await markSteamNewsAsSeen(news);
    marked += 1;
  }
  return marked;
}
