const router = require("express").Router();
const bodyParser = require("body-parser");
let Note = require("./models/Note");
let User = require("./models/User");

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
    console.log("Log from routes.js - called when saving edit");
    console.log(req.body);
    await Note.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.status(200).end();
            console.log("Log from put route: note updated")
        })
        .catch(err => res.status(400).json("Error " + err));
})

//Called when posting a new note
router.route("/").post((req, res) => {
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content
    });
    newNote.save()
        .then(() => {
            console.log("Log from routes.js - new note added");
            res.status(200).end();
            console.log("Log from post route: note added");
        })
        .catch(err => res.status(400).json("Error " + err));
});

//Called when deleting a note
router.route("/").delete(async (req, res) => {
    await Note.findByIdAndDelete(req.query.id)
    .then(() => {
        res.status(200).end();
        console.log("Log from delete route: note deleted");
    })
    console.log("Log from routes.js - deleted: " + req.query.id);
})

//Called for new user sign-up
router.route("/register").post(async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    // wrap in function 
    //https://stackoverflow.com/questions/40897225/mongoose-js-findone-returning-query-metadata
    const oldUser = User.findOne({username: newUser.username}, function(err, userObj) {
        if(err){
            return callback(err);
        } else if (userObj){
            return callback(null,userObj);
        } else {
            return callback();
        }
    });
    console.log(oldUser);

    try {
        if (oldUser) {
            res.send({error: "User already exists!"});
        }
        await newUser.save()
        .then(() => {
            console.log("New user created");
            res.status(200).end();
        })
        .catch(err => console.log(err));
    } catch (error) {
        res.send({status: "error!!!"});
    }
    
})

//Called when logging in
router.route("/login").post((req, res) => {
    console.log("login route!")
})

module.exports = router;