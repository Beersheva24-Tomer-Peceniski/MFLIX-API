import { ObjectId } from "mongodb";
import commentRepository from "../repositories/commentRepository.js";
import movieRepository from "../repositories/movieRepository.js";
import { DateTime } from "luxon";
import { createError } from "../errors/errors.js";

class CommentService {
    constructor() {
        this.commentsRepository = commentRepository;
    }

    async getByMovieId(movieId) {
        const movieIdObjectId = new ObjectId(movieId);
        return await commentRepository.getByMovieId(movieIdObjectId);
    }

    async getByEmail(email) {
        return await commentRepository.getByEmail(email);
    }

    async getByMovieIdAndEmail(movieId, email) {
        const movieIdObjectId = new ObjectId(movieId);
        return await commentRepository.getByMovieIdAndEmail(movieIdObjectId, email);
    }

    async add(comment) {
        comment.movie_id = new ObjectId(comment.movieId);
        delete comment.movieId;
        comment.date = DateTime.utc().toFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
        const newComment = await commentRepository.add(comment);
        movieRepository.addCommentsNumber(comment.movieId);
        return newComment;
    }

    async update(comment) {
        comment.id = new ObjectId(comment.commentId);
        const updatedComment = await commentRepository.update(comment);
        if(!updatedComment) {
            throw createError(400, "Comment not found");
        }
        return updatedComment;
    }

    async delete(id) {
        id = new ObjectId(id);
        const deletedComment = await commentRepository.delete(id);
        if(!deletedComment) {
            throw createError(400, "Comment not found");
        }
        return deletedComment;
    }

    getById(id) {
        const commentId = new ObjectId(id);
        return commentRepository.getById(commentId);
    }
}

const commentService = new CommentService();
export default commentService;