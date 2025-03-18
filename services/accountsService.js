import { accountRole } from "../constants/constants.js";
import { createError } from "../errors/errors.js";
import accountsRepository from "../repositories/accountsRepository.js";
import bcrypt from "bcrypt";

class AccountService {

    addUser(user) {
        return this.addAccount(user, accountRole.USER)
    }

    addAdmin(admin) {
        return this.addAccount(admin, accountRole.ADMIN)
    }

    async addAccount(account, role) {
        const oldUser = await accountsRepository.findByEmail(account.email)
        if(oldUser) {
            throw createError(409, "An account with this e-mail already exists")
        }
        account.role = role;
        account.blocked = false;
        account.password = await bcrypt.hash(account.password, 10);
        return accountsRepository.addUser(account);
    }

}

const accountsService = new AccountService();
export default accountsService;