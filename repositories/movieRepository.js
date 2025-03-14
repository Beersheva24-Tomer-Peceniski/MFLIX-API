import connectDB from "../database/database.js";

class MovieRepository {
    static db;

    static {
        (async () => {
            MovieRepository.db = await connectDB();
            if (!MovieRepository.db) {
                throw new Error("Database connection failed");
            }
        })()
    }

    async getMovieById(movieId) {
        const moviesCollection = MovieRepository.db.collection("movies");
        const movie = await moviesCollection.findOne({ _id: movieId });
        if (!movie) {
            throw new Error("There is no movie with this ID");
        }
        return movie;
    }

    async getMostRatedMovies(filter) {
        const moviesCollection = MovieRepository.db.collection("movies");
        const amount = filter.amount || 10;
        delete filter.amount;

        const query = {...filter, "imdb.rating": {$ne: null, $nin: [""]}}

        return moviesCollection.find(query)
            .project({ _id: 1, title: 1, "imdb.rating": 1, "imdb.id": 1 })
            .sort({ "imdb.rating": -1 })
            .limit(amount)
            .map(movie => ({
                _id:movie._id,
                title:movie.title,
                imdbId:movie.imdb.id,
                rating:movie.imdb.rating
            }))
            .toArray();
    }

    async getMostCommentedMovies(filter) {
        const moviesCollection = MovieRepository.db.collection("movies");
        const amount = filter.amount || 10;
        delete filter.amount;

        return moviesCollection.find(filter)
            .project({ _id: 1, title: 1, "imdb.id": 1, num_mflix_comments: 1})
            .sort({ num_mflix_comments: -1 })
            .limit(amount)
            .map(movie => ({
                _id:movie._id,
                title:movie.title,
                imdbId:movie.imdb.id,
                comments:movie.num_mflix_comments
            }))
            .toArray();
    }
}

const movieRepository = new MovieRepository();
export default movieRepository;