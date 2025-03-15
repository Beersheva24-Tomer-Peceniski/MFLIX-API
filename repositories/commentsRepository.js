import db from "../database/database.js";

class CommentRepository {
    static db = db;

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
        return await commentsCollection.findOne({ _id: insertedId });
    }

    async updateComment(comment) {
        const commentsCollection = CommentRepository.db.collection("comments");
        const { modifiedCount } = commentsCollection.updateOne({ _id: comment.id, email: comment.email },
            [{ $set: { "text": comment.text } }]
        );
        if(modifiedCount == 0) {
            throw new Error("Comment not found")
        }
        return await commentsCollection.findOne({_id : comment.id})
    }
}

const commentsRepository = new CommentRepository();
export default commentsRepository;