const router = require("express").Router();
const { User, Bootcamp, Instructor, Feedback } = require("../../models");
const withAuth = require('../../utils/auth');

//GET all instructors /api/instructors
router.get("/", (req, res) => {
    Instructor.findAll({
        attributes: ["id", "name", "bootcamp_id"]
    })
        .then(dbInstructorData => res.json(dbInstructorData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
});

//GET a single instructor /api/instructors/1
router.get("/:id", (req, res) => {
    Instructor.findOne({
        attributes: ["id", "name", "bootcamp_id"],
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Bootcamp,
                attributes: ["id", "name"]
            },
            {
                model: Feedback,
                attributes: ["review_text", "rating"],
                include: {
                    model: User,
                    attributes: ["id", "username"]
                }
            }
        ]
    })
        .then(dbInstructorData => {
            if(!dbInstructorData) {
                res.status(400).json({ message: "No instructor found with this id." });
                return;
            }
            res.json(dbInstructorData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST create an instructor /api/instructors
router.post("/", withAuth, (req, res) => {
    Instructor.create({
        name: req.body.name,
        //Change to req.session.bootcamp_id
        bootcamp_id: req.body.bootcamp_id
    })
        .then(dbInstructorData => res.json(dbInstructorData))
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
});

//DELETE an instructor /api/instructors/1
router.delete("/:id", withAuth, (req, res) => {
    Instructor.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbInstructorData => {
            if(!dbInstructorData) {
                res.status(404).json({ message: "No instructor found with that id." })
                return;
            }
            res.json(dbInstructorData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;