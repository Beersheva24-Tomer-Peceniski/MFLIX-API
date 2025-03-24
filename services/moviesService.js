import { ObjectId } from "mongodb";
import movieRepository from "../repositories/movieRepository.js"

class MovieService {
    constructor() {
        this.movieRepository = movieRepository;
    }

    async getById(movieId) {
        const movieIdObjectId = new ObjectId(movieId);
        return await movieRepository.getById(movieIdObjectId);
    }

    async getMostRated(filter) {
        if (filter.actor) {
            filter.cast = filter.actor;
            delete filter.actor;
        }
        if (filter.languages) {
            filter.languages = { $all: filter.languages }
        }
        if (filter.genres) {
            filter.genres = { $all: filter.genres }
        }
        return await movieRepository.getMostRated(filter);
    }

    async getMostCommented(filter) {
        return await movieRepository.getMostCommented(filter);
    }

    async addRate(rateInfo) {
        return await movieRepository.addRate(rateInfo);
    }
}

const movieService = new MovieService();
export default movieService;