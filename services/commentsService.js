import { ObjectId } from "mongodb";
import commentsRepository from "../repositories/commentsRepository.js";
import moviesRepository from "../repositories/moviesRepository.js";
import { DateTime } from "luxon";
import { createError } from "../errors/errors.js";

class CommentService {
    constructor() {
        this.commentsRepository = commentsRepository;
    }

    async getCommentsByMovieId(movieId) {
        const movieIdObjectId = new ObjectId(movieId);
        return await commentsRepository.getCommentsByMovieId(movieIdObjectId);
    }

    async getCommentsByEmail(email) {
        return await commentsRepository.getCommentsByEmail(email);
    }

    async addComment(comment) {
        comment.movieId = new ObjectId(comment.movieId);
        comment.date = DateTime.utc().toFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
        const newComment = await commentsRepository.addComment(comment);
        moviesRepository.addCommentsNumber(comment.movie_id);
        return newComment;
    }

    async updateComment(comment) {
        comment.id = new ObjectId(comment.commentId);
        const updatedComment = await commentsRepository.updateComment(comment);
        if(!updatedComment) {
            throw createError(400, "Comment not found");
        }
        return updatedComment;
    }

    async deleteCommentById(commentId) {
        commentId = new ObjectId(commentId);
        const deletedComment = await commentsRepository.deleteCommentById(commentId);
        if(!deletedComment) {
            throw createError(400, "Comment not found");
        }
        return deletedComment;
    }
}

const commentsService = new CommentService();
export default commentsService;