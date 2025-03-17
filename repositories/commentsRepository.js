import db from "../database/database.js";
import { createError } from "../errors/errors.js";

class CommentRepository {
    static db = db;

    async getCommentsByMovieId(movieId) {
        const commentsCollection = CommentRepository.db.collection("comments");
        const comments = await commentsCollection.find({ movie_id: movieId })
            .project({ email: 1, text: 1, _id: 0 })
            .toArray();
        return comments;
    }

    async getCommentsByEmail(email) {
        const commentsCollection = CommentRepository.db.collection("comments");
        const comments = await commentsCollection.find({ email: email }).toArray();
        return comments;
    }

    async deleteCommentById(commentId) {
        const commentsCollection = CommentRepository.db.collection("comments");
        const comment = await commentsCollection.findOne({ _id: commentId });
        const { deletedCount } = await commentsCollection.deleteOne({ _id: commentId });
        return deletedCount == 1 ? comment : null;
    }

    async addComment(comment) {
        const commentsCollection = CommentRepository.db.collection("comments");
        const { insertedId } = await commentsCollection.insertOne(comment)
        return await commentsCollection.findOne({ _id: insertedId });
    }

    async updateComment(comment) {
        const commentsCollection = CommentRepository.db.collection("comments");
        const { modifiedCount } = await commentsCollection.updateOne({ _id: comment.id, email: comment.email },
            [{ $set: { "text": comment.text } }]
        );
        return modifiedCount == 0 ? null : await commentsCollection.findOne({ _id: comment.id })
    }
}

const commentsRepository = new CommentRepository();
export default commentsRepository;