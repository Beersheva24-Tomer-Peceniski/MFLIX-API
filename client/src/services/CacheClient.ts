import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "./ApiClient";

export function useMoviesQuery(page?: number, limit?: number, filters?: { movieTitle?: string; year?: string; sortOrder?: string }) {
  return useInfiniteQuery({
    queryKey: ['movies', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiClient.getMovies(pageParam, limit || 24, filters);
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 3600_000, // 1 hour
  });
}