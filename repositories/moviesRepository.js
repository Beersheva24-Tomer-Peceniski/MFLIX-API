import db from "../database/database.js";

class MovieRepository {
    static db = db;

    async getMovieById(movieId) {
        const moviesCollection = MovieRepository.db.collection("movies");
        const movie = await moviesCollection.findOne({ _id: movieId });
        if (!movie) {
            throw new Error("There is no movie with this ID");
        }
        return movie;
    }

    addCommentsNumber(movieId) {
        const moviesCollection = MovieRepository.db.collection("movies");
        moviesCollection.updateOne({ _id: movieId },
            [{
                $set:
                    { "num_mflix_comments": { $add: ["$num_mflix_comments", 1] } }
            }]
        );
    }

    async getMostRatedMovies(filter) {
        const moviesCollection = MovieRepository.db.collection("movies");
        const amount = filter.amount || 10;
        delete filter.amount;

        const query = { ...filter, "imdb.rating": { $ne: null, $nin: [""] } }

        return moviesCollection.find(query)
            .project({ _id: 1, title: 1, "imdb.rating": 1, "imdb.id": 1 })
            .sort({ "imdb.rating": -1 })
            .limit(amount)
            .map(movie => ({
                _id: movie._id,
                title: movie.title,
                imdbId: movie.imdb.id,
                rating: movie.imdb.rating
            }))
            .toArray();
    }

    async getMostCommentedMovies(filter) {
        const moviesCollection = MovieRepository.db.collection("movies");
        const amount = filter.amount || 10;
        delete filter.amount;

        return moviesCollection.find(filter)
            .project({ _id: 1, title: 1, "imdb.id": 1, num_mflix_comments: 1 })
            .sort({ num_mflix_comments: -1 })
            .limit(amount)
            .map(movie => ({
                _id: movie._id,
                title: movie.title,
                imdbId: movie.imdb.id,
                comments: movie.num_mflix_comments
            }))
            .toArray();
    }

    async addRate(rateInfo) {
        const { id, rate } = rateInfo;
        const moviesCollection = MovieRepository.db.collection("movies");

        const { modifiedCount } = await moviesCollection.updateMany(
            { "imdb.id": id },
            [{
                $set: {
                    "imdb.rating": {
                        $cond: {
                            if: { $eq: ["$imdb.votes", ""] },
                            then: rate,
                            else: {
                                $divide: [
                                    { $add: [{ $multiply: ["$imdb.rating", "$imdb.votes"] }, rate] },
                                    { $add: ["$imdb.votes", 1] }
                                ]
                            }
                        }
                    },
                    "imdb.votes": {
                        $cond: {
                            if: { $eq: ["$imdb.votes", ""] },
                            then: 1,
                            else: { $add: ["$imdb.votes", 1] }
                        }
                    }
                }
            }]
        )
        return modifiedCount;
    }
}

const moviesRepository = new MovieRepository();
export default moviesRepository;