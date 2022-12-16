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
    
    // Level: Advanced
    
    // What you were doing:
    // await Note.findByIdAndUpdate(req.params.id, req.body)
    // .then("Note updated")
    // .catch(err => res.status(400).json("Error " + err));
    
    // Here the problem is that you are using async/await syntax. 
    // This syntax allow the code to wait for a promise to resolve 
    // in order to carry on with the next line.
    try {
      await Note.findByIdAndUpdate(req.params.id, req.body);

      // This is useless, is is related to the "then("Note updated")". It's useless for the promise to resolve a value since it's not used
      return "Note updated"; 
    }
    catch(err) {
      res.status(400).json("Error " + err)
    }

    // When using the async/await syntax, you are asking JS to wait for the promise to resolve
    // So the code will wait. But you may not need to wait for the promise to resolve 
    // if the calling code does not need a value from this code.
    // Here the routing code gives you a response object to use to answer the request.
    // The routing code does not expect any promises or value in return so you don't need to send a value back, 
    // neither that you have to await your promises. This code execute your function and goes down.
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