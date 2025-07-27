import { create } from 'zustand';

interface MovieFilters {
  movieTitle: string;
  year: string;
  setMovieTitle: (title: string) => void;
  setYear: (year: string) => void;
  resetFilters: () => void;
  getQueryParams: () => { movieTitle?: string; year?: string };
}

export const useMovieFilters = create<MovieFilters>((set, get) => ({
  movieTitle: '',
  year: '',
  
  setMovieTitle: (movieTitle: string) => set({ movieTitle }),
  
  setYear: (year: string) => set({ year }),
  
  resetFilters: () => set({ movieTitle: '', year: '' }),
  
  getQueryParams: () => {
    const { movieTitle, year } = get();
    const params: { movieTitle?: string; year?: string } = {};
    
    if (movieTitle.trim()) {
      params.movieTitle = movieTitle.trim();
    }
    
    if (year.trim()) {
      params.year = year.trim();
    }
    
    return params;
  },
})); 