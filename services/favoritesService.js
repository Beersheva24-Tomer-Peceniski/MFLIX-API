import { ObjectId } from "mongodb";
import { createError } from "../errors/errors.js";
import favoritesRepository from "../repositories/favoritesRepository.js";
import moviesRepository from "../repositories/moviesRepository.js";
import accountsRepository from "../repositories/accountsRepository.js";

class FavoritesService {

    async add(favorite) {
        favorite.movieId = new ObjectId(favorite.movieId);
        const oldFavorite = await favoritesRepository.findByEmailAndMovieId(favorite)
        if (oldFavorite) {
            throw createError(409, "This movie was already added as favorite")
        }
        if (!(await moviesRepository.getMovieById(favorite.movieId))) {
            throw createError(404, "There is no movie with the inserted movie id");
        }
        if (!(await accountsRepository.findByEmail(favorite.email))) {
            throw createError(404, "There is no account with the inserted email");
        }
        favorite.viewed = favorite.viewed ?? false;
        favorite.feedback = favorite.feedback ?? "";
        return favoritesRepository.add(favorite);
    }

    async getByEmail(email) {
        const account = await accountsRepository.findByEmail(email);
        if(!account) {
            throw createError(404, "There is no account with the inserted email")
        }
        return favoritesRepository.findByEmail(email);
    }

    async update(favorite) {
        favorite.id = new ObjectId(favorite.id);
        const oldFavorite = await favoritesRepository.findById(favorite.id);
        if(!oldFavorite) {
            throw createError(404, "There is no favorite with this ID");
        }
        favorite.viewed = favorite.viewed ?? oldFavorite.viewed;
        favorite.feedback = favorite.feedback ?? oldFavorite.feedback;
        const updatedFavorite = await favoritesRepository.update(favorite);
        if(!updatedFavorite) {
            throw createError(500, "It was not possible to update the favorite");
        }
        return updatedFavorite;
    }

}

const favoritesService = new FavoritesService();
export default favoritesService;