import movieRepository from "../repositories/movieRepository.js"

class MovieService {
    constructor() {
        this.movieRepository = movieRepository;
    }

    async getMovieById(movieId) {
        return await movieRepository.getMovieById(movieId);
    }

    async getMostRatedMovies(filter) {
        return await movieRepository.getMostRatedMovies(filter);
    }

    async getMostCommentedMovies(filter) {
        return await movieRepository.getMostCommentedMovies(filter);
    }

    async addRate(rateInfo) {
        return await movieRepository.addRate(rateInfo);
    }
}

const movieService = new MovieService();
export default movieService;