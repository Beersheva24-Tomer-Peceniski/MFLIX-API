import db from "../database/database.js";

class AccountsRepository {

    async addUser(user) {
        const accountsCollection = db.collection("accounts");
        const result = await accountsCollection.insertOne(user);
        return { _id: result.insertedId, ...user };
    }

    findByEmail(email) {
        const accountsCollection = db.collection("accounts");
        return accountsCollection.findOne({email});
    }
}

const accountsRepository = new AccountsRepository();
export default accountsRepository;