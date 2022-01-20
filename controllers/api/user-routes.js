const router = require("express").Router();
const { User, Instructor, Bootcamp, Feedback } = require("../../models")

//GET all users /api/users
router.get("/", (req, res) => {
    User.findAll({
        attributes: ["id", "username", "email", "password"]
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//GET a single user /api/users/1
router.get("/:id", (req, res) => {
    User.findOne({
        attributes: ["id", "username", "email", "password"],
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Feedback,
                attributes: ["id", "review_text", "rating"],
                include: [
                    {
                        model: Bootcamp,
                        attributes: ["name"]
                    },
                    {
                        model: Instructor,
                        attributes: ["name"]
                    }
                ]
            }
        ]        
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "No user found with this id." });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST create a user /api/users
router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            //Change to req.session.save(() => {}) after adding sessions
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST login a user
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(400).json({ message: "No user found with that email address." });
                return;
            }
            //Add checkPassword() here
            //Add req.session.save(() => {}) after adding sessions
            res.json(dbUserData);
        })
})

//Add logout POST request

module.exports = router;