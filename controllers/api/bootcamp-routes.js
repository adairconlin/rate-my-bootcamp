const router = require("express").Router();
const { User, Bootcamp, Instructor, Feedback } = require("../../models");
const withAuth = require('../../utils/auth');

//GET all bootcamps /api/bootcamps
router.get("/", (req, res) => {
    Bootcamp.findAll({
        attributes: ["id", "name"], 
    })
        .then(dbBootcampData => res.json(dbBootcampData))
        .catch(err => {
            console.log(err);
            res.json(500).json(err);
        });
});

//GET a single bootcamp /api/bootcamps/1
router.get("/:id", (req, res) => {
    Bootcamp.findOne({
        attributes: ["id", "name"],
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Feedback,
                attributes: ["id", "review_text", "rating"],
                include: {
                    model: User,
                    attributes: ["id", "username"]
                }
            },
            {
                model: Instructor,
                attributes: ["id", "name"]
            }
        ]
    })
    .then(dbBootcampData => {
        if(!dbBootcampData) {
            res.status(404).json({ message: "No bootcamp found with this id." });
            return;
        }
        res.json(dbBootcampData);
    })
    .catch(err => {
        console.log(err);
        res.json(500).json(err);
    });
});

//POST create a bootcamp /api/bootcamps
router.post("/", withAuth, (req, res) => {
    Bootcamp.create({
        name: req.body.name
    })
        .then(dbBootcampData => res.json(dbBootcampData))
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
});

//DELETE a bootcamp /api/bootcamps/1
router.delete("/:id", withAuth, (req, res) => {
    Bootcamp.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbBootcampData => {
            if(!dbBootcampData) {
                res.status(400).json({ message: "No bootcamp found with this id." });
                return;
            }
            res.json(dbBootcampData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;