const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Bootcamp, Instructor, Feedback } = require("../models");
const { Op } = require("sequelize");

router.get("/", (req, res) => {
    // revisit this later
    // may want to include the top bootcamps and top instructors on homepage
    Feedback.findAll({
        where: {
            rating: {
                [Op.gt]: 5
            }
        },
        attributes: ["id", "rating", "bootcamp_id", "instructor_id"],
        include: [
            {
                model: Bootcamp,
                attributes: ["id", "name"]
            },
            {
                model: Instructor,
                attributes: ["id", "name", "bootcamp_id"]
            }
        ]
    })
    .then(dbFeedbackData => {
        const topBootcamps = dbFeedbackData.filter(bootcamp => {
            if (bootcamp.bootcamp_id !== null && bootcamp.instructor_id === null) {
                return true;
            }
            else{
                return false;
            }
            })
            .map(bootcamp => bootcamp.get({ plain: true }))
            .sort((a, b) => b.rating - a.rating);
        //.map(bootcamp => bootcamp.get({ plain: true }));
        // want to have the highest rated bootcamps appear at the top of the list
        //topBootcamps.sort((a, b) => b.rating - a.rating);
        const topInstructors = dbFeedbackData.filter(instructor => {
            if (instructor.bootcamp_id === null && instructor.instructor_id !== null) {
                return true;
            }
            else {
                return false;
            }
        })
        .map(instructor => instructor.get({ plain: true }))
        .sort((a, b) => b.rating - a.rating);

        if (topBootcamps.length <= 10 && topInstructors.length <= 10) {
            res.render('homepage', { topBootcamps, topInstructors, loggedIn: req.session.loggedIn });
        }
        else if (topBootcamps.length > 10 && topInstructors <= 10) {
            topBootcamps = topBootcamps.slice(0,10);
            res.render('homepage', { topBootcamps, topInstructors, loggedIn: req.session.loggedIn });
        }
        else if (topBootcamps.length <= 10 && topInstructors.length > 10) {
            topInstructors = topInstructors.slice(0,10);
            res.render('homepage', { topBootcamps, topInstructors, loggedIn: req.session.loggedIn });
        }
        else {
            topBootcamps = topBootcamps.slice(0,10);
            topInstructors = topInstructors.slice(0,10);
            res.render('homepage', { topBootcamps, topInstructors, loggedIn: req.session.loggedIn });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
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
        const instructor = dbInstructorData.get({ plain:true });

        res.render('single-instructor', {instructor, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;