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
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@packages/constants/messages";

enum EVENT_TYPES {
  UserCreated = "user.created",
  UserUpdated = "user.updated",
  UserDeleted = "user.deleted",
}

const handleEvent = (event: WebhookEvent) => {
  const { type, data } = event;

  switch (type) {
    case EVENT_TYPES.UserCreated:
      return Effect.gen(function* () {
        yield* createUser({
          userId: data.id,
          ...data,
        } as UserJSON);
      });
    case EVENT_TYPES.UserUpdated: {
      return Effect.gen(function* () {
        const { data: user } = yield* fetchUserById(data.id);

        if (user?.id) {
          yield* updateUser(user.id, data);
        }
      });
    }

    case EVENT_TYPES.UserDeleted:
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
      return new Response(ERROR_MESSAGES.CLERK_WEBHOOK_SECRET_FAILED, {
        status: 500,
      });
    }

    const body = yield* Effect.tryPromise({
      try: () => req.text(),
      catch: (error) =>
        new Error(`${ERROR_MESSAGES.READ_REQUEST_FAILED}: ${error}`),
    });

    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return new Response(ERROR_MESSAGES.SVIX_HEADER_INVALID, { status: 400 });
    }

    const wh = new Webhook(WEBHOOK_SECRET);

    const event = yield* Effect.try({
      try: () =>
        wh.verify(body, {
          "svix-id": svixId,
          "svix-timestamp": svixTimestamp,
          "svix-signature": svixSignature,
        }) as WebhookEvent,
      catch: (error) =>
        new Error(`${ERROR_MESSAGES.SVIX_VERIFY_FAILED}: ${error}`),
    });

    yield* handleEvent(event);

    return new Response(SUCCESS_MESSAGES.SUBMIT_WEBHOOK_SUCCESS, {
      status: 200,
    });
  });
