import db from "../database/database.js";

class FavoritesRepository {

    async add(favorite) {
        const favoritesCollection = db.collection("favorites");
        const result = await favoritesCollection.insertOne(favorite);
        return { _id: result.insertedId, ...favorite };
    }

    findByEmailAndMovieId(favorite) {
        const favoritesCollection = db.collection("favorites");
        return favoritesCollection.findOne({ email: favorite.email, movieId: favorite.movieId });
    }

    findByEmail(email) {
        const favoritesCollection = db.collection("favorites");
        return favoritesCollection.find({email}).toArray();
    }
}

const favoritesRepository = new FavoritesRepository();
export default favoritesRepository;