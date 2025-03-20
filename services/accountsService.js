import { accountRole } from "../constants/constants.js";
import { createError } from "../errors/errors.js";
import accountsRepository from "../repositories/accountsRepository.js";
import bcrypt from "bcrypt";
import JwtUtil from "../security/JwtUtil.js";

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
            throw createError(404, "There is no account with the inserted email")
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
            throw createError(404, "There is no account with the inserted email")
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

    async blockAccount(email) {
        const oldAccount = await accountsRepository.findByEmail(email)
        if (!oldAccount) {
            throw createError(404, "There is no account with the inserted email")
        }
        if (oldAccount.blocked) {
            throw createError(400, "Inserted account is already blocked")
        }
        const blocked = await accountsRepository.blockAccount(email);
        if(!blocked) {
            throw createError(500, "It was not possible to block account");
        }
        return "Account successfully blocked"
    }

    async unblockAccount(email) {
        const oldAccount = await accountsRepository.findByEmail(email)
        if (!oldAccount) {
            throw createError(404, "There is no account with the inserted email")
        }
        if (!oldAccount.blocked) {
            throw createError(400, "Inserted account is already unblocked")
        }
        const unblocked = await accountsRepository.unblockAccount(email);
        if(!unblocked) {
            throw createError(500, "It was not possible to unblock account");
        }
        return "Account successfully unblocked"
    }

    async deleteAccount(email) {
        const oldAccount = await accountsRepository.findByEmail(email)
        if (!oldAccount) {
            throw createError(404, "There is no account with the inserted email")
        }
        const deleted = await accountsRepository.deleteAccount(email);
        if(!deleted) {
            throw createError(500, "It was not possible to delete account");
        }
        return "Account successfully deleted"
    }

    async checkLogin(email, password) {
        const account = await accountsRepository.findByEmail(email);
        if (!account || !(await bcrypt.compare(password, account.password))) {
            throw createError(400, "Wrong credentials")
        }
    }

    async login(account) {
        await this.checkLogin(account.email, account.password)
        account = await accountsRepository.findByEmail(account.email);
        if(account.blocked) {
            throw createError(400, "Inserted account is blocked")
        }
        return JwtUtil.getJwt(account);
    }
}

const accountsService = new AccountService();
export default accountsService;