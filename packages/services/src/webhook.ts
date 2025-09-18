import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Effect } from "effect";

import {
  createUser,
  deleteUser,
  fetchUserById,
  updateUser,
  UserJSON,
} from "./user";

const handleEvent = (event: WebhookEvent) => {
  const { type, data } = event;

  switch (type) {
    case "user.created":
      return Effect.gen(function* () {
        yield* createUser({
          userId: data.id,
          ...data,
        } as UserJSON);
      });
    case "user.updated": {
      return Effect.gen(function* () {
        const { data: user } = yield* fetchUserById(data.id);
        if (user?.id) {
          yield* updateUser(user.id, data);
        }
      });
    }

    case "user.deleted":
      return Effect.gen(function* () {
        if (data.id) {
          const { data: user } = yield* fetchUserById(data.id);
          if (user?.id) {
            yield* deleteUser(user.id);
          }
        }
      });

    default:
      return Effect.succeed(undefined);
  }
};

export const webhookHandler = (req: Request) =>
  Effect.gen(function* () {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      console.error("❌ Missing Clerk Webhook Secret in .env.local");
      return new Response("Server Misconfiguration", { status: 500 });
    }

    const body = yield* Effect.tryPromise({
      try: () => req.text(),
      catch: (error) => new Error(`Failed to read request body: ${error}`),
    });

    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return new Response("Missing Svix headers", { status: 400 });
    }

    const wh = new Webhook(WEBHOOK_SECRET);

    const event = yield* Effect.try({
      try: () =>
        wh.verify(body, {
          "svix-id": svixId,
          "svix-timestamp": svixTimestamp,
          "svix-signature": svixSignature,
        }) as WebhookEvent,
      catch: (error) => new Error(`Webhook verification failed: ${error}`),
    });

    yield* handleEvent(event);

    return new Response("OK", { status: 200 });
  });
