import { ObjectId } from "mongodb";
import { createError } from "../errors/errors.js";
import favoritesRepository from "../repositories/favoritesRepository.js";
import moviesRepository from "../repositories/moviesRepository.js";
import accountsRepository from "../repositories/accountsRepository.js";

class FavoritesService {

    async addFavorite(favorite) {
        favorite.movieId = new ObjectId(favorite.movieId);
        const oldFavorite = await favoritesRepository.findByEmailAndMovieId(favorite)
        if (oldFavorite) {
            throw createError(409, "This movie was already added as favorite")
        }
        if (!(await moviesRepository.getMovieById(favorite.movieId))) {
            throw createError(409, "There is no movie with the inserted movie id");
        }
        if (!(await accountsRepository.findByEmail(favorite.email))) {
            throw createError(409, "There is no account with the inserted email");
        }
        favorite.viewed = favorite.viewed ?? false;
        favorite.feedback = favorite.feedback ?? "";
        return favoritesRepository.addFavorite(favorite);
    }

}

const favoritesService = new FavoritesService();
export default favoritesService;