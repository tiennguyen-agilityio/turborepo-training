import { Effect } from "effect";

// Constants
import { HTTP_METHOD } from "@packages/types/api";
import { ERROR_MESSAGES } from "@packages/constants/messages";

type FetchOptions = {
  url: string;
  errorMessage: string;
  method?: HTTP_METHOD;
  body?: unknown;
  headers?: Record<string, string>;
};

const HEADERS_DEFAULT = { "Content-Type": "application/json" };

export const effectFetch = <T>(
  options: FetchOptions
): Effect.Effect<T, Error, never> => {
  const {
    url,
    errorMessage,
    method = HTTP_METHOD.GET,
    body,
    headers,
  } = options;

  return Effect.tryPromise({
    try: () =>
      fetch(url, {
        method,
        headers: { ...HEADERS_DEFAULT, ...headers },
        body: body ? JSON.stringify(body) : undefined,
      }),
    catch: () => new Error(errorMessage),
  }).pipe(
    Effect.flatMap((res) =>
      res.ok
        ? Effect.tryPromise({
            try: () => res.json(),
            catch: () => new Error(ERROR_MESSAGES.JSON_INVALID_RESPONSE),
          })
        : Effect.fail(new Error(errorMessage))
    )
  );
};
