import {
  Box,
  Typography,
  Avatar,
  Paper,
  CircularProgress
} from '@mui/material';
import type Comment from '../models/Comment';
import { formatDate, getInitials } from '../utils/commentUtils';

interface CommentListProps {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  hasComments: boolean;
}

export default function CommentList({ comments, loading, error, hasComments }: CommentListProps) {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center">
        {error}
      </Typography>
    );
  }

  if (!hasComments) {
    return (
      <Typography 
        color="text.secondary" 
        textAlign="center"
        sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        No comments yet for this movie.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        overflow: 'auto',
        flex: 1,
        pr: 1
      }}
    >
      {comments.map((comment) => (
        <Paper
          key={comment._id}
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: 'grey.50'
          }}
          elevation={1}
        >
          <Box display="flex" alignItems="flex-start" gap={2}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                fontWeight: 'bold'
              }}
            >
              {getInitials(comment.name)}
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {comment.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(comment.date)}
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                {comment.text}
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
