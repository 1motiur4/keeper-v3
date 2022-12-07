const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-motiur:T%40bleT0p13@cluster0.aaq3igl.mongodb.net/keeperDB");

const noteSchema = {
    title: String,
    content: String
}

const Note = mongoose.model("Note", noteSchema);

app.post("/", function (req, res) {
    const Note = new Note({
        title: req.body.noteTitle,
        content: req.body.noteContent
    });

    post.save(function (err) {
        if (!err) {
            res.redirect("/");
        }
    })
})

app.listen(5000, function () {
    console.log("Server started on port 5000");
});
