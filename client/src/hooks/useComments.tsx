import { useState, useEffect } from 'react';
import type Comment from '../models/Comment';
import apiClient from '../services/ApiClient';

export default function useComments(movieId: string | null) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setComments([]);
      setError(null);
      return;
    }

    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.getCommentsByMovieId(movieId);
        setComments(response.data);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments');
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [movieId]);

  return {
    comments,
    loading,
    error,
    hasComments: comments.length > 0
  };
}
