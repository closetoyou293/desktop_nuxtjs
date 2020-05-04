const   mongoose = require("mongoose");
const   Schema = mongoose.Schema;

const Users = new Schema({
    auth: {
        username: { type: String },
        password: { type: String }
    },
    profile: {
        id: { type: Schema.Types.ObjectId },
        username: { type: String },
        email: { type: String },
        date: { type: Date, default: Date.now}
    },
    setting: {type: Schema.Types.ObjectId, ref: 'Setting'}
});

Users.index({ auth: { username: 1 } });
module.exports = Users;