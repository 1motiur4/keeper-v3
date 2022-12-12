const router = require("express").Router();
const bodyParser = require("body-parser");
let Note = require("./models");

router.use(bodyParser.urlencoded({ extended: true }));

//GET ALL NOTES
router.route("/").get((req, res) => {
    Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json("Error: " + err));
});

//Called when edit modal is opened
router.route("/:id").get((req, res) => {
    Note.findById(req.params.id)
        .then(note => res.json(note))
        .catch(err => res.status(400).json("Error " + err));
    console.log("Edit requested for id: " + req.params.id);
});

//Called when saving edit modal
router.route("/:id").put(async (req, res) => {
    console.log("testing route put res");
    console.log(req.body);
    await Note.findByIdAndUpdate(req.params.id, req.body)
    .then("Note updated")
    .catch(err => res.status(400).json("Error " + err));
})

//Called when posting a new note
router.route("/").post(async (req, res) => {
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content
    });
    await newNote.save()
        .then(() => res.send("New note added"))
        .catch(err => res.status(400).json("Error " + err));
});

//Called when deleting a note
router.route("/").delete(async (req, res) => {
    console.log(req.query.id);
    await Note.findByIdAndDelete(req.query.id);
})

module.exports = router;