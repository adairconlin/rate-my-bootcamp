const router = require("express").Router();
const { route } = require("express/lib/application");
const sequelize = require("../config/connection");
const { User, Bootcamp, Instructor, Feedback } = require("../models");

// get all instructors and bootcamps using the feedback model in order to calculate the average of their ratings
router.get("/", (req, res) => {
    Feedback.findAll({
        attributes: ["id", "bootcamp_id", [sequelize.cast(sequelize.fn('AVG', sequelize.col('rating')), 'dec(2,1)'), 'avg_camp_rating']],
        include: [
            {
                model:Bootcamp,
                attributes: ["id", "name"]
            }
        ],
        raw: true,
        group: ['Bootcamp.name'],
        order: sequelize.literal(`avg(rating) DESC`)
    })
    .then(dbFeedbackData => {
        if (dbFeedbackData) {
            setArrays(dbFeedbackData, 1);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

    Feedback.findAll({
        attributes: ["Feedback.id", "Feedback.instructor_id", [sequelize.cast(sequelize.fn('AVG', sequelize.col('rating')), 'dec(2,1)'), 'avg_instructor_rating']],
        include: [
            {
                model: Instructor,
                attributes: ["id", "name", "bootcamp_id"],
                include: [
                    {
                        model: Bootcamp,
                        attributes: ["id", "name"]
                    }
                ]
            }
        ],
        raw: true,
        group: ['Instructor.name'],
        order: sequelize.literal(`avg(rating) DESC`)
    })
    .then(dbFeedbackData => {
        setArrays(dbFeedbackData, 2);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

    let topBootcamps = [];
    let topInstructors = [];
    // filter the array data before rendering to the client
    const setArrays = (arr, counter) => {
        // rare situation where no data is found by the instructor feedback query
        if (arr.length === 0 && counter == 2) {
            res.render('homepage', { topBootcamps, topInstructors, loggedIn: req.session.loggedIn });
        }
        else if (arr[0].bootcamp_id) {
            topBootcamps = arr.filter(bootcamp => {
                if (bootcamp.avg_camp_rating >= 7) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
        else {
            topInstructors = arr.filter(instructor => {
                if (instructor.avg_instructor_rating >= 7) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
        // tracker to ensure both query results were passed to this function and rendering can happen
        if (counter === 2) {
            res.render('homepage', { topBootcamps, topInstructors, loggedIn: req.session.loggedIn });
        }
    };
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// add bootcamp page
router.get("/create-bootcamp", (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    }
    res.render('create-bootcamp', { loggedIn: req.session.loggedIn, user_id: req.session.user_id });
});

// add instructor page
router.get("/create-instructor", (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    }

    Bootcamp.findAll({
        attributes: ["id", "name"],
        raw: true
    })
    .then(dbBootcampData => {
        const allBootcamps = dbBootcampData;
        res.render('create-instructor', { allBootcamps, loggedIn: req.session.loggedIn, user_id: req.session.user_id });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/bootcamps", (req, res) => {
    Bootcamp.findAll({
        attributes: ["id", "name"],
        include: {
            model: Feedback,
            attributes: ["bootcamp_id", [sequelize.cast(sequelize.fn('AVG', sequelize.col('rating')), 'dec(2,1)'), 'avg_camp_rating']]
        },
        raw: true,
        group: ['Bootcamp.name'],
        order: sequelize.literal(`Bootcamp.name ASC`)
    })
    .then(dbBootcampData => {        
        const bootcamps = dbBootcampData;
        res.render('all-bootcamps', { bootcamps, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
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
                attributes: ["id", "review_text", "rating", "created_at"],
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

        res.render('single-bootcamp', { bootcamp, loggedIn: req.session.loggedIn, user_id: req.session.user_id });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/instructors", (req, res) => {
    Instructor.findAll({
        attributes: ["id", "name", "bootcamp_id"],
        include: {
            model: Feedback,
            attributes: ["id", "instructor_id", [sequelize.cast(sequelize.fn('AVG', sequelize.col('rating')), 'dec(2,1)'), 'avg_instructor_rating']]
        },
        raw: true,
        group: ['Instructor.name'],
        order: sequelize.literal(`Instructor.name ASC`)
    })
    .then(dbInstructorData => {
        const instructors = dbInstructorData;
        res.render('all-instructors', { instructors, loggedIn: req.session.loggedIn });
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
                attributes: ["review_text", "rating", "created_at"],
                include: {
                    model: User,
                    attributes: ["id", "username"]
                }
            }
        ]
    })
    .then(dbInstructorData => {
        if (!dbInstructorData) {
            res.status(404).json({ message: 'No instructor found with this id' });
            return;
        }
        const instructor = dbInstructorData.get({ plain:true });

        res.render('single-instructor', {instructor, loggedIn: req.session.loggedIn, user_id: req.session.user_id });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;