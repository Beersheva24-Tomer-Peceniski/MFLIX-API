import { ObjectId } from "mongodb";
import moviesRepository from "../repositories/moviesRepository.js"

class MovieService {
    constructor() {
        this.movieRepository = moviesRepository;
    }

    async getMovieById(movieId) {
        const movieIdObjectId = new ObjectId(movieId);
        return await moviesRepository.getMovieById(movieIdObjectId);
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