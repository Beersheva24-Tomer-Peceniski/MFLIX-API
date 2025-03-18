import { userRole } from "../constants/constants.js";
import { createError } from "../errors/errors.js";
import accountsRepository from "../repositories/accountsRepository.js";
import bcrypt from "bcrypt";

class AccountService {

    async addUser(user) {
        const oldUser = await accountsRepository.findByEmail(user.email)
        if(oldUser) {
            throw createError(409, "An account with this e-mail already exists")
        }
        user.role = userRole.USER;
        user.blocked = false;
        user.password = await bcrypt.hash(user.password, 10);
        return accountsRepository.addUser(user);
    }

}

const accountsService = new AccountService();
export default accountsService;