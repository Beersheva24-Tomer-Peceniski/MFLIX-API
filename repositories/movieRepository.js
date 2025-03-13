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
}

const movieRepository = new MovieRepository();
export default movieRepository;