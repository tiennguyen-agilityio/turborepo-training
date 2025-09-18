import { useState, useEffect, useCallback } from "react";
import { Effect } from "effect";

import { PAGE_SIZE } from "@packages/constants/common";
import { QueryParams, Response } from "@packages/types/api";

type UseLoadMoreOptions<T> = {
  fetcher: (params: QueryParams) => Effect.Effect<Response<T[]>, never, never>;
  limit?: number;
};

export const useLoadMore = <T>({
  fetcher,
  limit = PAGE_SIZE,
}: UseLoadMoreOptions<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleLoadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError("");

    const { data: newData, error } = await Effect.runPromise(
      fetcher({ page, limit })
    );

    if (error) {
      setError(error);
      setHasMore(false);
    } else {
      if (newData && newData.length > 0) {
        setData((prev) => [...prev, ...newData]);
      }
      setHasMore(Boolean(newData && newData.length === limit));
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [fetcher, page, limit, isLoading, hasMore]);

  useEffect(() => {
    handleLoadMore();
  }, []);

  return {
    data,
    isLoading,
    error,
    hasMore,
    onLoadMore: handleLoadMore,
  };
};
