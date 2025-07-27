import { useMovieFilters } from '../state-management/movieFilters';
import { useMoviesQuery } from '../services/CacheClient';
import type { AxiosError } from 'axios';

function extractErrorMessage(error: unknown): string | null {
  if (!error) return null;
  // Axios error
  if (typeof error === 'object' && error !== null && 'isAxiosError' in error) {
    const axiosError = error as AxiosError<any>;
    return (
      axiosError.response?.data?.error ||
      axiosError.message ||
      'Something went wrong'
    );
  }
  // Fallback
  if (error instanceof Error) return error.message;
  return String(error);
}

export default function useMovies() {
  const { getQueryParams } = useMovieFilters();
  const filters = getQueryParams();
  const { data, isLoading, error } = useMoviesQuery(undefined, undefined, filters);

  return {
    movies: data?.movies || [],
    loading: isLoading,
    error: extractErrorMessage(error),
  };
}