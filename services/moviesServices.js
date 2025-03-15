import moviesRepository from "../repositories/moviesRepository.js"

class MovieService {
    constructor() {
        this.movieRepository = moviesRepository;
    }

    async getMovieById(movieId) {
        return await moviesRepository.getMovieById(movieId);
    }

    async getMostRatedMovies(filter) {
        return await moviesRepository.getMostRatedMovies(filter);
    }

    async getMostCommentedMovies(filter) {
        return await moviesRepository.getMostCommentedMovies(filter);
    }

    async addRate(rateInfo) {
        return await moviesRepository.addRate(rateInfo);
    }
}

const moviesService = new MovieService();
export default moviesService;