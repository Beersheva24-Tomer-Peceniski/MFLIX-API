import { ObjectId } from "mongodb";
import commentRepository from "../repositories/commentRepository.js";
import movieRepository from "../repositories/movieRepository.js";
import { DateTime } from "luxon";
import { createError } from "../errors/errors.js";

class CommentService {
    constructor() {
        this.commentsRepository = commentRepository;
    }

    async getCommentsByMovieId(movieId) {
        const movieIdObjectId = new ObjectId(movieId);
        return await commentRepository.getCommentsByMovieId(movieIdObjectId);
    }

    async getCommentsByEmail(email) {
        return await commentRepository.getCommentsByEmail(email);
    }

    async addComment(comment) {
        comment.movieId = new ObjectId(comment.movieId);
        comment.date = DateTime.utc().toFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
        const newComment = await commentRepository.addComment(comment);
        movieRepository.addCommentsNumber(comment.movie_id);
        return newComment;
    }

    async updateComment(comment) {
        comment.id = new ObjectId(comment.commentId);
        const updatedComment = await commentRepository.updateComment(comment);
        if(!updatedComment) {
            throw createError(400, "Comment not found");
        }
        return updatedComment;
    }

    async deleteCommentById(commentId) {
        commentId = new ObjectId(commentId);
        const deletedComment = await commentRepository.deleteCommentById(commentId);
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