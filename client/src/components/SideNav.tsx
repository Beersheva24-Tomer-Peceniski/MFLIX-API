import { Box, TextField, Button, Typography, Stack, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { useMovieFilters } from '../state-management/movieFilters';

export default function SideNav() {
  // Local state for input fields
  const [localMovieTitle, setLocalMovieTitle] = useState('');
  const [localYear, setLocalYear] = useState('');
  
  // Global state actions
  const { setMovieTitle, setYear, setSortOrder, resetFilters, sortOrder } = useMovieFilters();

  const handleSearch = () => {
    // Update global state only when search is pressed
    setMovieTitle(localMovieTitle);
    setYear(localYear);
  };

  const handleReset = () => {
    // Reset both local and global state
    setLocalMovieTitle('');
    setLocalYear('');
    resetFilters();
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    setSortOrder(newOrder);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'white', mb: 3 }}>
        Movie Filters
      </Typography>
      
      <Stack spacing={3}>
        <TextField
          label="Movie Name"
          variant="outlined"
          value={localMovieTitle}
          onChange={(e) => setLocalMovieTitle(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'white',
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
          }}
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            label="Year"
            variant="outlined"
            type="number"
            value={localYear}
            onChange={(e) => setLocalYear(e.target.value)}
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
            }}
          />
          <Tooltip title={sortOrder === 'desc' ? 'Newer movies first' : 'Older movies first'}>
            <IconButton
              onClick={toggleSortOrder}
              sx={{
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {sortOrder === 'desc' ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </IconButton>
          </Tooltip>
        </Box>
        
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              flex: 1,
              backgroundColor: '#4CAF50',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{
              flex: 1,
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
} 