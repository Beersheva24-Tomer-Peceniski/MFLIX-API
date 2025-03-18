import db from "../database/database.js";

class AccountsRepository {

    async addUser(user) {
        const accountsCollection = db.collection("accounts");
        const result = await accountsCollection.insertOne(user);
        return { _id: result.insertedId, ...user };
    }

    findByEmail(email) {
        const accountsCollection = db.collection("accounts");
        return accountsCollection.findOne({ email });
    }

    async updateRole(account) {
        const accountsCollection = db.collection("accounts");
        const { modifiedCount } = await accountsCollection.updateOne({ email: account.email },
            { $set: { role: account.role } }
        );
        return modifiedCount == 0 ? null : accountsCollection.findOne({ email: account.email })
    }

    async updatePassword(account) {
        const accountsCollection = db.collection("accounts");
        const { modifiedCount } = await accountsCollection.updateOne({ email: account.email },
            { $set: { password: account.password } }
        );
        return modifiedCount == 0 ? null : accountsCollection.findOne({ email: account.email })
    }
}

const accountsRepository = new AccountsRepository();
export default accountsRepository;