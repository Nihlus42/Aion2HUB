import { sendDiscordNotification } from "../../../../lib/server/notifyDiscord";

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
  pragma: "no-cache",
  expires: "0",
} as const;

export async function POST(request: Request): Promise<Response> {
  const expectedSecret = process.env.ADMIN_SECRET?.trim();
  const receivedSecret = request.headers.get("x-admin-secret")?.trim();

  console.log("[admin-test-discord] ADMIN_SECRET configured:", Boolean(process.env.ADMIN_SECRET));
  console.log("[admin-test-discord] ADMIN_SECRET length:", process.env.ADMIN_SECRET?.length ?? 0);
  console.log("[admin-test-discord] Header received:", Boolean(request.headers.get("x-admin-secret")));
  console.log("[admin-test-discord] Header length:", request.headers.get("x-admin-secret")?.length ?? 0);
  console.log(
    "[admin-test-discord] Secret match:",
    request.headers.get("x-admin-secret") === process.env.ADMIN_SECRET,
  );

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
    await sendDiscordNotification({
      title: "🚨 Test Aion2HUB",
      description: "La notification Discord fonctionne.",
      fields: [
        { name: "Source", value: "Aion2HUB", inline: true },
        { name: "Statut", value: "Test", inline: true },
      ],
    });

    return Response.json(
      {
        ok: true,
        message: "Notification Discord envoyée.",
      },
      { headers: jsonHeaders },
    );
  } catch (error) {
    console.error("[discord] Test route failed", error);
    return Response.json(
      {
        ok: false,
        error: "Impossible d'envoyer la notification Discord pour le moment.",
      },
      { status: 500, headers: jsonHeaders },
    );
  }
}
