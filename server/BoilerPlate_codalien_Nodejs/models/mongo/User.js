const MongoDbModel = require('../../bootloader/mongo');

class User extends MongoDbModel {

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
            name: String,
            email: String,
            password:String,
            users:[{type: mongoose.Schema.Types.ObjectId, ref: 'AssignUser'}],
            tasks:[{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
            createdAt: Number,
            updatedAt: Number,
        })
    }

    static get Indexes() {
        return [];
    }
}

exports = module.exports = User;

