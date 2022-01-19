const router = require("express").Router();
const { User, Bootcamp, Feedback} = require("../../models");

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
        }
        //Include Bootcamp name, Feedback rating and reviews
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
router.post("/", (req, res) => {
    Instructor.create({
        name: req.body.name,
        //Change to req.session.bootcamp_id
        bootcamp_id: req.body.bootcamp_id
    })
        .then(dbInstructorData => {
            //Add req.session.save(() => {}) after adding sessions
            res.json(dbInstructorData);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
});

