import { Effect } from "effect";
import { webhookHandler } from "@packages/services/webhook";

export const POST = (request: Request) =>
  Effect.runPromise(webhookHandler(request));
