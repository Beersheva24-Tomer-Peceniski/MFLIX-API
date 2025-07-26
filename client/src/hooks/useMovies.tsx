import { useState, useEffect } from 'react'
import apiClient from '../services/ApiClient'
import type Movie from '../models/Movie'

export default function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const getMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await apiClient.getMovies()
                setMovies(response.data.movies)
            } catch (err: any) {
                const newError = err.response?.data?.error || err.message || 'Something went wrong';
                setError(newError);
            } finally {
                setLoading(false)
            }
        }

        getMovies()
    }, [])

    return { movies, loading, error }
}