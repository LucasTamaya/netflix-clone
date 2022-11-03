import { useQuery } from "@tanstack/react-query";

export const useLazyQuery = (key: string[], fn: any, options: any = {}) => {
  const query = useQuery(key, fn, {
    ...options,
    enabled: false,
  });

  return {
    ...query,
    // handle this err: https://github.com/TanStack/query/issues/3584
    isLoading: query.isLoading && query.fetchStatus !== "idle",
  };
};
