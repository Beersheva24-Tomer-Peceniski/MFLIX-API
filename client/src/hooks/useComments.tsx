import { useState, useEffect } from 'react';
import type { Comment, NewComment } from '../models/Comment';
import apiClient from '../services/ApiClient';

export default function useComments(movieId: string | null) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [postingComment, setPostingComment] = useState(false);

  const fetchComments = async () => {
    if (!movieId) {
      setComments([]);
      setError(null);
      return;
    }

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

  useEffect(() => {
    fetchComments();
  }, [movieId]);

  const addComment = async (commentData: NewComment) => {
    try {
      setPostingComment(true);
      setError(null);
      await apiClient.postComment(commentData);
      // Refresh comments after successful post
      await fetchComments();
    } catch (err) {
      console.error('Error posting comment:', err);
      setError('Failed to post comment');
      throw err;
    } finally {
      setPostingComment(false);
    }
  };

  return {
    comments,
    loading,
    error,
    hasComments: comments.length > 0,
    addComment,
    postingComment
  };
}
