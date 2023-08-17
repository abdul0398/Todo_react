const MongoDbModel = require('../../bootloader/mongo');

class AssignUser extends MongoDbModel {

    /*Define which database to connect to*/
    static get connection() {
        return this.APP_DB;
    }

    /* Needed functions by the MongoDbModel Interface */
    static get Name() {
        return this.name;
    }

    static get Schema() {
        return mongoose => ({
            email: String,
            isverified:Boolean,
            createdAt: Number,
            updatedAt: Number,
        })
    }

    static get Indexes() {
        return [];
    }
}

exports = module.exports = AssignUser;

