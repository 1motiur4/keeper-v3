const router = require("express").Router();
const bodyParser = require("body-parser");
let Note = require("./models");

router.use(bodyParser.urlencoded({ extended: true }));

router.route("/").get((req, res) => {
    Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content
    });
    newNote.save()
        .then(() => res.send("New note added"))
        .catch(err => res.status(400).json("Error " + err));
});

router.route("/").delete(async (req, res) => {
    console.log(req.query.id);
    await Note.findByIdAndDelete(req.query.id);
})

module.exports = router;