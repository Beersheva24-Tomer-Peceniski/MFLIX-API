import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect, useRef, useCallback, useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieExploration from "../components/MovieExploration";
import useMovies from "../hooks/useMovies";
import type Movie from "../models/Movie";
import notFoundImg from "../assets/not-found.png";

export default function HomePage() {
  const { 
    movies, 
    loading, 
    error, 
    hasNextPage, 
    isFetchingNextPage, 
    fetchNextPage 
  } = useMovies();
  
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastMovieElementRef = useRef<HTMLDivElement | null>(null);

  const lastMovieRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    
    if (node) {
      observerRef.current.observe(node);
      lastMovieElementRef.current = node;
    }
  }, [loading, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseMovieExploration = () => {
    setSelectedMovie(null);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Grid
        padding={2}
        container
        spacing={2}
        sx={{
          width: '100%',
          margin: 0,
          minHeight: '100%'
        }}
      >
        {movies.length > 0 ? (
          movies.map((m: Movie, index: number) => {
            if (index === movies.length - 1 && hasNextPage) {
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={m._id} ref={lastMovieRef}>
                  <MovieCard movie={m} onClick={handleMovieClick} />
                </Grid>
              );
            }
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={m._id}>
                <MovieCard movie={m} onClick={handleMovieClick} />
              </Grid>
            );
          })
        ) : !loading && !error ? (
          <Grid
            size={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '80vh',
              width: '100%'
            }}
          >
            <Box sx={{ mb: 3 }}>
              <img
                src={notFoundImg}
                alt="No movies found"
                style={{
                  width: '200px',
                  height: 'auto',
                  opacity: 0.8
                }}
              />
            </Box>
            <Typography
              variant="h6"
              color="text.secondary"
              textAlign="center"
              sx={{
                maxWidth: '400px',
                lineHeight: 1.5
              }}
            >
              No movie was found with the selected filters
            </Typography>
          </Grid>
        ) : null}
      </Grid>

      {hasNextPage && !loading && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingY: 3
        }}>
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
            sx={{ minWidth: '120px' }}
          >
            {isFetchingNextPage ? (
              <CircularProgress size={20} />
            ) : (
              'Load More'
            )}
          </Button>
        </Box>
      )}

      {loading && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          width: '100%'
        }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {error && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          width: '100%'
        }}>
          <Typography color="error.main" textAlign="center" variant="h6">
            {error}
          </Typography>
        </Box>
      )}

      {selectedMovie && (
        <MovieExploration
          movie={selectedMovie}
          onClose={handleCloseMovieExploration}
        />
      )}
    </Box>
  );
}