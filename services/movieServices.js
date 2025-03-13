import movieRepository from "../repositories/movieRepository.js"

class MovieService {
    constructor() {
        this.movieRepository = movieRepository;
    }

    async getMovieById(movieId) {
        return await movieRepository.getMovieById(movieId);
    }
}

const movieService = new MovieService();
export default movieService;