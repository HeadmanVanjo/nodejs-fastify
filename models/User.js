const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
    },
    age: {
        type: Number
    },
    email: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = {User: mongoose.model("User", UserSchema)};