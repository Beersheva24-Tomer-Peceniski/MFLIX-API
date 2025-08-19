import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Comment, NewComment } from '../models/Comment';
import apiClient from '../services/ApiClient';

export default function useComments(movieId: string | null) {
  const queryClient = useQueryClient();
  
  // Query key for comments
  const commentsQueryKey = ['comments', movieId];

  // Fetch comments query
  const {
    data: comments = [],
    isLoading: loading,
    error: queryError
  } = useQuery({
    queryKey: commentsQueryKey,
    queryFn: async () => {
      if (!movieId) return [];
      const response = await apiClient.getCommentsByMovieId(movieId);
      return response.data;
    },
    enabled: !!movieId,
  });

  // Add comment mutation with optimistic updates
  const addCommentMutation = useMutation({
    mutationFn: async (commentData: NewComment) => {
      const response = await apiClient.postComment(commentData);
      return response.data;
    },
    onMutate: async (newComment: NewComment) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: commentsQueryKey });

      // Snapshot the previous value
      const previousComments = queryClient.getQueryData(commentsQueryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(commentsQueryKey, (old: Comment[] = []) => {
        const optimisticComment: Comment = {
          _id: `temp-${Date.now()}`, // Temporary ID for optimistic update
          ...newComment,
          date: new Date().toISOString(),
        };
        return [...old, optimisticComment];
      });

      // Return a context object with the snapshotted value
      return { previousComments };
    },
    onError: (err, newComment, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousComments) {
        queryClient.setQueryData(commentsQueryKey, context.previousComments);
      }
      console.error('Error posting comment:', err);
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: commentsQueryKey });
    },
  });

  const addComment = async (commentData: NewComment) => {
    try {
      await addCommentMutation.mutateAsync(commentData);
    } catch (err) {
      // Error is already handled in onError, but we can re-throw if needed
      throw err;
    }
  };

  // Helper function to check if there's a mutation error
  const getMutationError = () => {
    if (addCommentMutation.error) {
      return 'Failed to post comment. Please try again.';
    }
    return null;
  };

  // Function to reset mutation error state
  const resetMutationError = () => {
    addCommentMutation.reset();
  };

  return {
    comments,
    loading,
    error: queryError ? 'Failed to load comments' : null,
    hasComments: comments.length > 0,
    addComment,
    postingComment: addCommentMutation.isPending,
    mutationError: getMutationError(),
    isError: addCommentMutation.isError,
    resetMutationError
  };
}
