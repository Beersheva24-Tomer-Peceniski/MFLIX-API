import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MovieCard from "../components/MovieCard";
import useMovies from "../hooks/useMovies";
import type Movie from "../models/Movie";
import notFoundImg from "../assets/not-found.png";

export default function HomePage() {
  const { movies, loading, error } = useMovies();

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
          movies.map((m: Movie) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={m._id}>
              <MovieCard movie={m} />
            </Grid>
          ))
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
    </Box>
  );
}