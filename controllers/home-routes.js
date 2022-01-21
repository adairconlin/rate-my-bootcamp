const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Bootcamp, Instructor, Feedback } = require("../models");

router.get("/", (req, res) => {

});

router.get("/login", (req, res) => {

});

router.get("/bootcamps", (req, res) => {
    Bootcamp.findAll({
        attributes: ["id", "name"],
    })
    .then(dbBootcampData => {
        const bootcamps = dbBootcampData.map(bootcamp => bootcamp.get({ plain: true }));

        res.render('bootcamps', { bootcamps, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.json(500).json(err);
    });
});

router.get("/bootcamp/:id", (req, res) => {
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
        if (!dbBootcampData) {
            res.status(404).json({ message: "No bootcamp found with this id." });
            return;
        }
        const bootcamp = dbBootcampData.get({ plain: true });

        res.render('single-bootcamp', { bootcamp, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.json(500).json(err);
    });
});

router.get("/instructors", (req, res) => {
    Instructor.findAll({
        attributes: ["id", "name", "bootcamp_id"]
    })
    .then(dbInstructorData => {
        const instructors = dbInstructorData.map(instructor => instructor.get({ plain: true }));

        res.render('instructors', { instructors, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.get("/instructor/:id", (req, res) => {

});

module.exports = router;