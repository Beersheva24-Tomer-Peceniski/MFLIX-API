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
        const oldAccount = await accountsRepository.findByEmail(account.email)
        if (oldAccount) {
            throw createError(409, "An account with this e-mail already exists")
        }
        account.role = role;
        account.blocked = false;
        account.password = await bcrypt.hash(account.password, 10);
        return accountsRepository.addUser(account);
    }

    async updateRole(account) {
        const oldAccount = await accountsRepository.findByEmail(account.email)
        if (!oldAccount) {
            throw createError(400, "There is no account with the inserted email")
        }
        if (oldAccount.role == account.role) {
            throw createError(400, "Inserted role is the same as previous one")
        }
        const updatedAccount = await accountsRepository.updateRole(account);
        if (!updatedAccount) {
            throw createError(500, "It was not possible to update role")
        }
        return updatedAccount;
    }

    async updatePassword(account) {
        const oldAccount = await accountsRepository.findByEmail(account.email)
        if (!oldAccount) {
            throw createError(400, "There is no account with the inserted email")
        }
        const isMatch = await bcrypt.compare(account.password, oldAccount.password)
        if (isMatch) {
            throw createError(400, "Inserted password is the same as previous one")
        }
        account.password = await bcrypt.hash(account.password, 10);
        const updatedAccount = await accountsRepository.updatePassword(account);
        if (!updatedAccount) {
            throw createError(500, "It was not possible to update password")
        }
        return updatedAccount;
    }

    async fyndByEmail(email) {
        return await accountsRepository.findByEmail(email);
    }

}

const accountsService = new AccountService();
export default accountsService;