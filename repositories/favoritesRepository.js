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

    async update(favorite) {
        const favoritesCollection = db.collection("favorites");
        const { modifiedCount } = await favoritesCollection.updateOne({ _id: favorite.id, email: favorite.email },
            { $set: { viewed: favorite.viewed, feedback: favorite.feedback } }
        );
        return modifiedCount == 0 ? null : this.findById(favorite.id);
    }

    async delete(id) {
        const favoritesCollection = db.collection("favorites");
        const favorite = await this.findById(id);
        const { deletedCount } = await favoritesCollection.deleteOne({ _id: id });
        return deletedCount == 0 ? null : favorite
    }

    findById(id) {
        const favoritesCollection = db.collection("favorites");
        return favoritesCollection.findOne({ _id: id });
    }
}

const favoritesRepository = new FavoritesRepository();
export default favoritesRepository;