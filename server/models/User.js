const mongoose = require("mongoose");

const userSchema = {
    username: String,
    password: {type: String, unique: true}
}

module.exports = mongoose.model("User", userSchema);