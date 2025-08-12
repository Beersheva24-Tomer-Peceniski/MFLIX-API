import React from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Divider,
  Chip,
  Rating
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type Movie from '../models/Movie';
import useComments from '../hooks/useComments';
import CommentList from './CommentList';
import fallback from '../assets/no-poster.png';

interface MovieExplorationProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieExploration({ movie, onClose }: MovieExplorationProps) {
  const { comments, loading, error, hasComments } = useComments(movie._id);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
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
