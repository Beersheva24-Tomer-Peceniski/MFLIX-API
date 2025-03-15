import { ObjectId } from "mongodb";
import commentsRepository from "../repositories/commentsRepository.js";

class CommentService {
    constructor() {
        this.commentsRepository = commentsRepository;
    }

    async getComments(movieId) {
        const movieIdObjectId = new ObjectId(movieId);
        return await commentsRepository.getComments(movieIdObjectId);
    }
}

const commentsService = new CommentService();
export default commentsService;