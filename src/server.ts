import "./lib/error-capture";

import { POST as postCheckSteamNewsApiRoute } from "./app/api/admin/check-steam-news/route";
import { POST as postDiscordTestApiRoute } from "./app/api/admin/test-discord/route";
import { POST as postSteamNewsDiscordTestApiRoute } from "./app/api/admin/test-steam-news-discord/route";
import { GET as getCronSteamNewsApiRoute } from "./app/api/cron/steam-news/route";
import { GET as getSteamNewsApiRoute } from "./app/api/steam-news/route";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const requestUrl = new URL(request.url);
    if (request.method === "GET" && requestUrl.pathname === "/api/steam-news") {
      return getSteamNewsApiRoute();
    }
    if (request.method === "POST" && requestUrl.pathname === "/api/admin/test-discord") {
      return postDiscordTestApiRoute(request);
    }
    if (request.method === "POST" && requestUrl.pathname === "/api/admin/test-steam-news-discord") {
      return postSteamNewsDiscordTestApiRoute(request);
    }
    if (request.method === "POST" && requestUrl.pathname === "/api/admin/check-steam-news") {
      return postCheckSteamNewsApiRoute(request);
    }
    if (request.method === "GET" && requestUrl.pathname === "/api/cron/steam-news") {
      return getCronSteamNewsApiRoute(request);
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
