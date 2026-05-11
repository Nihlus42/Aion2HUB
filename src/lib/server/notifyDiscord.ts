type DiscordField = {
  name: string;
  value: string;
  inline?: boolean;
};

type DiscordNotificationPayload = {
  title: string;
  description?: string;
  url?: string;
  fields?: DiscordField[];
};

type DiscordWebhookBody = {
  embeds: Array<{
    title: string;
    description?: string;
    url?: string;
    color: number;
    fields?: DiscordField[];
    timestamp: string;
  }>;
};

export async function sendDiscordNotification(payload: DiscordNotificationPayload): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("[discord] DISCORD_WEBHOOK_URL is not configured. Notification skipped.");
    return;
  }

  const body: DiscordWebhookBody = {
    embeds: [
      {
        title: payload.title,
        description: payload.description,
        url: payload.url,
        color: 0xed4245,
        fields: payload.fields,
        timestamp: new Date().toISOString(),
      },
    ],
  };

  let response: Response;
  try {
    response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch (error) {
    console.error("[discord] Network error while sending webhook notification", error);
    throw new Error("discord_webhook_network_error");
  }

  if (!response.ok) {
    const responseBody = await response.text().catch(() => "");
    console.error("[discord] Webhook returned non-OK response", {
      status: response.status,
      body: responseBody,
    });
    throw new Error("discord_webhook_http_error");
  }

  console.info("[discord] Notification sent successfully");
}
