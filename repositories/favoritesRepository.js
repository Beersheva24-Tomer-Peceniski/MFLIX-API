import db from "../database/database.js";

class FavoritesRepository {

    async addFavorite(favorite) {
        const favoritesCollection = db.collection("favorites");
        const result = await favoritesCollection.insertOne(favorite);
        return { _id: result.insertedId, ...favorite };
    }

    findByEmailAndMovieId(favorite) {
        const favoritesCollection = db.collection("favorites");
        return favoritesCollection.findOne({ email: favorite.email, movieId: favorite.movieId });
    }
}

const favoritesRepository = new FavoritesRepository();
export default favoritesRepository;