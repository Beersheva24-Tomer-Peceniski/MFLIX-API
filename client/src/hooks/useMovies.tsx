import { useState, useEffect } from 'react'
import apiClient from '../services/ApiClient'
import type Movie from '../models/Movie'
import { useMovieFilters } from '../state-management/movieFilters'

export default function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    // Get filters from Zustand store
    const { movieTitle, year, getQueryParams } = useMovieFilters();

    useEffect(() => {
        const getMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                const filters = getQueryParams();
                const response = await apiClient.getMovies(undefined, undefined, filters);
                setMovies(response.data.movies);
            } catch (err: any) {
                const newError = err.response?.data?.error || err.message || 'Something went wrong';
                setError(newError);
            } finally {
                setLoading(false);
            }
        }

        getMovies();
    }, [movieTitle, year]); // Only depend on the actual filter values

    return { movies, loading, error }
}