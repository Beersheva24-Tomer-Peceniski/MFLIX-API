import db from "../database/database.js";

class CommentRepository {
    async getByMovieId(movieId) {
        const commentsCollection = db.collection("comments");
        return commentsCollection.find({ movie_id: movieId })
            .project({ email: 1, text: 1, _id: 0 })
            .toArray();
    }

    async getByEmail(email) {
        const commentsCollection = db.collection("comments");
        return commentsCollection.find({ email: email }).toArray();
    }

    async delete(id) {
        const commentsCollection = db.collection("comments");
        const comment = await commentsCollection.findOne({ _id: id });
        const { deletedCount } = await commentsCollection.deleteOne({ _id: id });
        return deletedCount == 0 ? null : comment;
    }

    async add(comment) {
        const commentsCollection = db.collection("comments");
        const { insertedId } = await commentsCollection.insertOne(comment)
        return commentsCollection.findOne({ _id: insertedId });
    }

    async update(comment) {
        const commentsCollection = db.collection("comments");
        const { modifiedCount } = await commentsCollection.updateOne({ _id: comment.id, email: comment.email },
            [{ $set: { "text": comment.text } }]
        );
        return modifiedCount == 0 ? null : await commentsCollection.findOne({ _id: comment.id })
    }

    async getById(id) {
        const commentsCollection = db.collection("comments");
        return commentsCollection.findOne({ _id: id });
    }
}

const commentRepository = new CommentRepository();
export default commentRepository;