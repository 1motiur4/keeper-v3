const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb+srv://admin-motiur:T%40bleT0p13@cluster0.aaq3igl.mongodb.net/keeperDB");
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const notesRouter = require("./routes.js");
app.use("/notes", notesRouter);

app.listen(5000, function () {
    console.log("Server started on port 5000");
});
