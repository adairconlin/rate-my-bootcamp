const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Bootcamp, Instructor, Feedback } = require("../models");
const withAuth = require('../utils/auth');

//Dashboard page /dashboard/
router.get("/", withAuth, (req, res) => {
    // get the feedback reviews for logged in user
    Feedback.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ["id", "review_text", "rating", "created_at"],
        include: [
            {
                model: Bootcamp,
                attributes: ["id", "name"]
            },
            {
                model: User,
                attributes: ["id", "username"]
            }
        ]
    })
    .then(dbFeedbackData => {
        const feedback = dbFeedbackData.map(feedback => feedback.get({ plain: true }));
        res.render('dashboard', { feedback, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Edit feedback page /dashboard/edit/:id
router.get("/edit/:id", withAuth, (req, res) => {
    // get the feedback with the id provided
    Feedback.findByPk(req.params.id, {
        attributes: ["id", "review_text", "rating", "created_at"],
        include: [
            {
                model: Bootcamp,
                attributes: ["id", "name"]
            },
            {
                model: User,
                attributes: ["id", "username"]
            }
        ]
    })
    .then(dbFeedbackData => {
        if (dbFeedbackData) {
            const feedback = dbFeedbackData.get({ plain: true });
            res.render('edit-feedback', { feedback, loggedIn: true });
        }
        else {
            res.status(404).end();
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;