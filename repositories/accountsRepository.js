import db from "../database/database.js";

class AccountsRepository {

    async addUser(user) {
        const accountsCollection = db.collection("accounts");
        const result = await accountsCollection.insertOne(user);
        return { _id: result.insertedId, ...user };
    }
}

const accountsRepository = new AccountsRepository();
export default accountsRepository;