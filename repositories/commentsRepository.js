import connectDB from "../database/database.js";

class CommentRepository {
    static db;

    static {
        (async () => {
            CommentRepository.db = await connectDB();
            if (!CommentRepository.db) {
                throw new Error("Database connection failed");
            }
        })()
    }

    async getComments(movieId) {
        const commentsCollection = CommentRepository.db.collection("comments");
        const comments = await commentsCollection.find({ movie_id: movieId })
            .project({ email: 1, text: 1, _id: 0 })
            .toArray();
        return comments;
    }

    async addComment(comment) {
        const commentsCollection = CommentRepository.db.collection("comments");
        const { insertedId } = await commentsCollection.insertOne(comment)
        return await commentsCollection.findOne({_id : insertedId });
    }
}

const commentsRepository = new CommentRepository();
export default commentsRepository;