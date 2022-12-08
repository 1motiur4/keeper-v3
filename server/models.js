const mongoose = require("mongoose");

const noteSchema = {
    title: String,
    content: String
}

module.exports = mongoose.model("Note", noteSchema);