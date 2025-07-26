import { Box, CircularProgress } from "@mui/material";
import useMovies from "../hooks/useMovies";

export default function HomePage() {
  const { movies, loading, error } = useMovies()

  return (
    <>
      {
        movies.length > 0 && (movies.map(m =>
          <Box color="black">{m.title}</Box>
        ))
      }
      {loading && <CircularProgress sx={{ alignSelf: 'center' }} />}
      {
        error && (
          <Box color="error.main" textAlign="center">{error}</Box>
        )
      }
    </>
  )
}