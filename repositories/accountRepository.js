import db from "../database/database.js";

class AccountRepository {

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

    async blockAccount(email) {
        const accountsCollection = db.collection("accounts");
        const { modifiedCount } = await accountsCollection.updateOne({ email },
            { $set: { blocked: true } }
        );
        return modifiedCount != 0;
    }

    async unblockAccount(email) {
        const accountsCollection = db.collection("accounts");
        const { modifiedCount } = await accountsCollection.updateOne({ email },
            { $set: { blocked: false } }
        );
        return modifiedCount != 0;
    }

    async deleteAccount(email) {
        const accountsCollection = db.collection("accounts");
        const { deletedCount } = await accountsCollection.deleteOne({ email });
        return deletedCount != 0;
    }

    async isBlocked(email) {
        const accountsCollection = db.collection("accounts");
        const account = await accountsCollection.findOne({email});
        return !!account.blocked;
    }
}

const accountRepository = new AccountRepository();
export default accountRepository;