import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Divider,
  Chip,
  Rating,
  TextField,
  Button,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import type Movie from '../models/Movie';
import useComments from '../hooks/useComments';
import CommentList from './CommentList';
import fallback from '../assets/no-poster.png';
import { useUserData } from '../state-management/user';

interface MovieExplorationProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieExploration({ movie, onClose }: MovieExplorationProps) {
  const { 
    comments, 
    loading, 
    error, 
    hasComments, 
    addComment, 
    postingComment, 
    mutationError, 
    isError, 
    resetMutationError 
  } = useComments(movie._id);
  const [commentText, setCommentText] = useState('');
  const userEmail = useUserData(state => state.email);
  const userName = useUserData(state => state.name);

  // Clear mutation error when user starts typing
  useEffect(() => {
    if (commentText.length > 0 && mutationError) {
      resetMutationError();
    }
  }, [commentText, mutationError, resetMutationError]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) {
      return; // Don't submit empty comments
    }

    if (!userEmail || !userName) {
      return; // User should be logged in to reach this point
    }
    
    try {
      // Reset any previous mutation errors
      resetMutationError();
      
      await addComment({
        name: userName,
        email: userEmail,
        movieId: movie._id,
        text: commentText.trim()
      });
      
      // Clear the form after successful submission
      setCommentText('');
    } catch (err) {
      // Error is handled by the mutation error state
      console.error('Comment submission error:', err);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
      onClick={handleBackdropClick}
    >
      <Paper
        sx={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          width: '1200px',
          height: '700px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
        elevation={24}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'primary.main',
            color: 'white'
          }}
        >
          <Typography variant="h5" component="h2">
            {movie.title}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Box
            sx={{
              width: '40%',
              p: 3,
              borderRight: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box
              component="img"
              src={movie.poster || fallback}
              alt={movie.title}
              sx={{
                maxHeight: '50%',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: 1,
                mb: 2
              }}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src !== fallback) {
                  target.src = fallback;
                }
              }}
            />
            
            <Typography variant="h6" gutterBottom textAlign="center">
              {movie.title}
            </Typography>
            
            <Chip 
              label={`Year: ${movie.year}`} 
              variant="outlined" 
              sx={{ mb: 1 }}
            />
            
            <Box display="flex" alignItems="center" mb={2}>
              <Rating 
                value={movie.rating / 2} 
                precision={0.1} 
                readOnly 
                size="medium" 
              />
              <Typography variant="body1" ml={1}>
                {isNaN(Number(movie.rating)) ? 'N/A' : Number(movie.rating).toFixed(1)}
              </Typography>
            </Box>

            {movie.plot && (
              <Typography 
                variant="body2" 
                color="text.secondary" 
                textAlign="center"
                sx={{ lineHeight: 1.6 }}
              >
                {movie.plot}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              width: '60%',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Comments ({comments.length})
            </Typography>
            
            <Divider sx={{ mb: 2 }} />

            {/* Comment Input Form */}
            <Box component="form" onSubmit={handleSubmitComment} sx={{ mb: 3 }}>
              {mutationError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {mutationError}
                </Alert>
              )}
              
              {!userEmail || !userName ? (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Please log in to post comments
                </Alert>
              ) : (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Write your comment here..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    variant="outlined"
                    size="small"
                    disabled={postingComment}
                    sx={{ flex: 1 }}
                    error={!commentText.trim() && commentText.length > 0}
                    helperText={!commentText.trim() && commentText.length > 0 ? 'Comment cannot be empty' : ''}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!commentText.trim() || postingComment}
                    startIcon={<SendIcon />}
                    sx={{ 
                      minWidth: 'auto',
                      px: 2,
                      py: 1.5,
                      height: 'fit-content'
                    }}
                  >
                    {postingComment ? 'Posting...' : 'Post'}
                  </Button>
                </Box>
              )}
            </Box>

            <CommentList
              comments={comments}
              loading={loading}
              error={error}
              hasComments={hasComments}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
