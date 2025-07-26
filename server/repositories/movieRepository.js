import db from "../database/database.js";
import { createError } from "../errors/errors.js";

class MovieRepository {

    async getById(movieId) {
        const moviesCollection = db.collection("movies");
        const movie = await moviesCollection.findOne({ _id: movieId });
        if (!movie) {
            throw createError(400, "There is no movie with this ID");
        }
        return movie;
    }

    addCommentsNumber(movieId) {
        const moviesCollection = db.collection("movies");
        moviesCollection.updateOne({ _id: movieId },
            [{
                $set:
                    { "num_mflix_comments": { $add: ["$num_mflix_comments", 1] } }
            }]
        );
    }

    async getMostRated(filter) {
        const moviesCollection = db.collection("movies");
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

    async getMostCommented(filter) {
        const moviesCollection = db.collection("movies");
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
        const { id, rating } = rateInfo;
        const moviesCollection = db.collection("movies");

        const { modifiedCount } = await moviesCollection.updateMany(
            { "imdb.id": id },
            [{
                $set: {
                    "imdb.rating": {
                        $cond: {
                            if: { $eq: ["$imdb.votes", ""] },
                            then: rating,
                            else: {
                                $divide: [
                                    { $add: [{ $multiply: ["$imdb.rating", "$imdb.votes"] }, rating] },
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

    async getPaginated(page, limit) {
        const moviesCollection = db.collection("movies");

        const skip = (page - 1) * limit;

        const movies = await moviesCollection.find({})
            .project({
                _id: 1,
                title: 1,
                "imdb.rating": 1,
                plot: 1,
                poster: 1,
                num_mflix_comments: 1,
                year: 1,
                fullplot: 1
            })
            .skip(skip)
            .limit(limit)
            .toArray();

        const total = await moviesCollection.countDocuments();

        return {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            movies: movies.map(movie => {
                const { imdb, ...rest } = movie;
                return {
                    ...rest,
                    rating: imdb?.rating ?? null
                };
            })
        };
    }

}

const movieRepository = new MovieRepository();
export default movieRepository;