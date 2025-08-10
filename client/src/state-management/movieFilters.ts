import { create } from 'zustand';

interface MovieFilters {
  movieTitle: string;
  year: string;
  sortOrder: 'asc' | 'desc'; // 'asc' = older first, 'desc' = newer first
  setMovieTitle: (title: string) => void;
  setYear: (year: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  resetFilters: () => void;
  getQueryParams: () => { movieTitle?: string; year?: string; sortOrder?: string };
}

export const useMovieFilters = create<MovieFilters>((set, get) => ({
  movieTitle: '',
  year: '',
  sortOrder: 'desc', // Default to newer movies first
  
  setMovieTitle: (movieTitle: string) => set({ movieTitle }),
  
  setYear: (year: string) => set({ year }),
  
  setSortOrder: (sortOrder: 'asc' | 'desc') => set({ sortOrder }),
  
  resetFilters: () => set({ movieTitle: '', year: '', sortOrder: 'desc' }),
  
  getQueryParams: () => {
    const { movieTitle, year, sortOrder } = get();
    const params: { movieTitle?: string; year?: string; sortOrder?: string } = {};
    
    if (movieTitle.trim()) {
      params.movieTitle = movieTitle.trim();
    }
    
    if (year.trim()) {
      params.year = year.trim();
    }
    
    if (sortOrder) {
      params.sortOrder = sortOrder;
    }
    
    return params;
  },
})); 