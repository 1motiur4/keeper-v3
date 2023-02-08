require('dotenv').config()
const router = require("express").Router();
const bodyParser = require("body-parser");
let Note = require("./models/Note");
let User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWTSECRET;

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
    const bcryptedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
        username: req.body.username,
        password: bcryptedPassword
    });

    const existingUsername = await User.findOne({ username: newUser.username });
    console.log(existingUsername);

    try {
        if (existingUsername) {
            console.log("existing user: " + existingUsername);
            return res.send({ error: "User already exists!" });
        }
        await newUser.save()
            .then(() => {
                console.log("New user created");
                res.status(200).end();
            })
            .catch(err => console.log(err));
    } catch (error) {
        res.send({ status: "error!!!" });
    }
})

//Called when logging in
router.route("/login").post(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    console.log("Log - Found user " + user);
    if (!user) {
        return res.json({ error: "User Not Found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        //const token = jwt.sign({}, JWT_SECRET);

        if (res.status(201)) {
            console.log("req.body ", req.body);
            //return res.json({token, username });
            return res.json(req.body.username);
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "Invalid password" });
});

//retrieve user data
router.route("/userData").post(async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const user_username = user.username;
        User.findOne({ username: user_username })
            .then((data) => {
                res.send({ status: "ok", data: data });
                console.log("LOG FROM routes.js /userData " + data);
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            })
    } catch (error) {
        console.log("Error from /userData route " + error);
    }
})

module.exports = router;