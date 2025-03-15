import { ObjectId } from "mongodb";
import commentsRepository from "../repositories/commentsRepository.js";
import moviesRepository from "../repositories/moviesRepository.js";
import { DateTime } from "luxon";

class CommentService {
    constructor() {
        this.commentsRepository = commentsRepository;
    }

    async getComments(movieId) {
        const movieIdObjectId = new ObjectId(movieId);
        return await commentsRepository.getComments(movieIdObjectId);
    }

    async addComment(comment) {
        comment.movie_id = new ObjectId(comment.movie_id);
        comment.date = DateTime.utc().toFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
        const newComment = await commentsRepository.addComment(comment);
        moviesRepository.addCommentsNumber(comment.movie_id);
        return newComment;
    }

    async updateComment(comment) {
        comment.id = new ObjectId(comment.id);
        const updatedComment = await commentsRepository.updateComment(comment);
        return updatedComment;
    }
}

const commentsService = new CommentService();
export default commentsService;