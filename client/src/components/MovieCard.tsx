import { Card, CardContent, CardMedia, Typography, Box, Rating } from "@mui/material";
import type Movie from "../models/Movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card sx={{ maxWidth: 250, minHeight: 380, display: 'flex', flexDirection: 'column', m: 1 }}>
      <CardMedia
        component="img"
        height="300"
        image={movie.poster}
        alt={movie.title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" gutterBottom noWrap>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Year: {movie.year}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Rating value={movie.rating / 2} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" ml={1}>
            {movie.rating?.toFixed(1)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
