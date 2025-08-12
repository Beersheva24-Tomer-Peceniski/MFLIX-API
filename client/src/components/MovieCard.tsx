import { Card, CardContent, CardMedia, Typography, Box, Rating } from "@mui/material";
import type Movie from "../models/Movie";
import fallback from '../assets/no-poster.png'

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <Card 
      sx={{ 
        width: '100%', 
        minHeight: 380, 
        display: 'flex', 
        flexDirection: 'column', 
        m: 1,
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 8
        }
      }}
      onClick={() => onClick(movie)}
    >
      <CardMedia
        component="img"
        height="300"
        image={movie.poster || fallback}
        alt={movie.title}
        sx={{ objectFit: "contain" }}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          if (target.src !== fallback) {
            target.src = fallback;
          }
        }}
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
            {isNaN(Number(movie.rating)) ? 'N/A' : Number(movie.rating).toFixed(1)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
