import { ObjectId } from "mongodb";
import { createError } from "../errors/errors.js";
import favoriteRepository from "../repositories/favoriteRepository.js";
import movieRepository from "../repositories/movieRepository.js";
import accountRepository from "../repositories/accountRepository.js";

class FavoriteService {

    async add(favorite) {
        favorite.movieId = new ObjectId(favorite.movieId);
        const oldFavorite = await favoriteRepository.findByEmailAndMovieId(favorite)
        if (oldFavorite) {
            throw createError(409, "This movie was already added as favorite")
        }
        if (!(await movieRepository.getMovieById(favorite.movieId))) {
            throw createError(404, "There is no movie with the inserted movie id");
        }
        if (!(await accountRepository.findByEmail(favorite.email))) {
            throw createError(404, "There is no account with the inserted email");
        }
        favorite.viewed = favorite.viewed ?? false;
        favorite.feedback = favorite.feedback ?? "";
        return favoriteRepository.add(favorite);
    }

    async getByEmail(email) {
        const account = await accountRepository.findByEmail(email);
        if(!account) {
            throw createError(404, "There is no account with the inserted email")
        }
        return favoriteRepository.findByEmail(email);
    }

    async update(favorite) {
        favorite.id = new ObjectId(favorite.id);
        const oldFavorite = await favoriteRepository.findById(favorite.id);
        if(!oldFavorite) {
            throw createError(404, "There is no favorite with this ID");
        }
        favorite.viewed = favorite.viewed ?? oldFavorite.viewed;
        favorite.feedback = favorite.feedback ?? oldFavorite.feedback;
        const updatedFavorite = await favoriteRepository.update(favorite);
        if(!updatedFavorite) {
            throw createError(500, "It was not possible to update the favorite");
        }
        return updatedFavorite;
    }

    async delete(favorite) {
        favorite.id = new ObjectId(favorite.id);
        const oldFavorite = await favoriteRepository.findById(favorite.id);
        if(!oldFavorite) {
            throw createError(404, "There is no favorite with this ID");
        }
        const deletedFavorite = await favoriteRepository.delete(favorite.id);
        if(!deletedFavorite) {
            throw createError(500, "It was not possible to delete the favorite");
        }
        return deletedFavorite;
    }

}

const favoriteService = new FavoriteService();
export default favoriteService;