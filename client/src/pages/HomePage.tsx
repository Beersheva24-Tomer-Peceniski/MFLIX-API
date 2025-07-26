import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import MovieCard from "../components/MovieCard";
import useMovies from "../hooks/useMovies";
import type Movie from "../models/Movie";

export default function HomePage() {
  const { movies, loading, error } = useMovies();

  return (
    <Box p={2}>
      <Grid container spacing={2} justifyContent="center">
        {movies.length > 0 && movies.map((m: Movie) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <MovieCard movie={m} />
          </Grid>
        ))} 
      </Grid>
      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />}
      {error && (
        <Box color="error.main" textAlign="center">{error}</Box>
      )}
    </Box>
  );
}