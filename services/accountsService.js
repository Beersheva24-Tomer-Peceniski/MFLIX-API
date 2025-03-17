import { userRole } from "../constants/constants.js";
import accountsRepository from "../repositories/accountsRepository.js";
import bcrypt from "bcrypt";

class AccountService {

    async addUser(user) {
        user.role = userRole.USER;
        user.blocked = false;
        user.password = await bcrypt.hash(user.password, 10);
        return accountsRepository.addUser(user);
    }

}

const accountsService = new AccountService();
export default accountsService;