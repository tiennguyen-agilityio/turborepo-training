import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";

import { createUser, deleteUser, fetchUserById, updateUser, UserJSON } from "./user";

const handleEvent = async (event: WebhookEvent) => {
  const { type, data } = event;

  switch (type) {
    case "user.created": {
      await createUser({
        userId: data.id,
        ...data,
      } as UserJSON);

      break;
    }

    case "user.updated": {
      const { user } = await fetchUserById(data.id);

      if (user?.id) {
        await updateUser(user?.id, data);
      }

      break;
    }

    case "user.deleted": {
      if (data.id) {
        const { user } = await fetchUserById(data.id);
        if (user?.id) {
          await deleteUser(user?.id);
        }
      }

      break;
    }

    default:
      break;
  }
};

export const webhookHandler = async (req: Request) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ Missing Clerk Webhook Secret in .env.local");
    return new Response("Server Misconfiguration", { status: 500 });
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  const headerPayload = await headers();
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id") || "",
    "svix-timestamp": headerPayload.get("svix-timestamp") || "",
    "svix-signature": headerPayload.get("svix-signature") || "",
  };

  if (!svixHeaders["svix-id"] || !svixHeaders["svix-timestamp"] || !svixHeaders["svix-signature"]) {
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  const data = await req.json();
  const payload = JSON.stringify(data);

  let event;
  try {
    event = wh.verify(payload, svixHeaders) as WebhookEvent;
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  if (event) {
    await handleEvent(event);
  }

  return new Response("Webhook processed", { status: 200 });
};
