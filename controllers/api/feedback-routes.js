const router = require("express").Router();
const { User, Instructor, Bootcamp, Feedback } = require("../../models")

//GET all feedback /api/feedback
router.get("/", (req, res) => {
    Feedback.findAll({
        attributes: ["id", "review_text", "rating", , "user_id", "instructor_id", "bootcamp_id"]
    })
        .then(dbFeedbackData => res.json(dbFeedbackData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//GET all feedback about a single bootcamp /api/feedback/1
router.get("/:bootcamp_id", (req, res) => {
    Feedback.findAll({
        attributes: ["id", "review_text", "rating"],
        where: {
            bootcamp_id: req.params.bootcamp_id
        },
        include: [
            {
                model: Bootcamp,
                attributes: ["id", "name"]
            },
            {
                mode: Instructor,
                attributes: ["id", "name"]
            },
            {
                model: User,
                attributes: ["id", "name"]
            }
        ]
    })
        .then(dbFeedbackData => {
            if(!dbFeedbackData) {
                res.status(404).json({ message: "No bootcamp found with this id." });
                return;
            }
            res.json(dbFeedbackData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET all feedback about a single instructor /api/feedback/1
router.get("/:instructor_id", (req, res) => {
    Feedback.findAll({
        attributes: ["id", "review_text", "rating"],
        where: {
            instructor_id: req.params.instructor_id
        },
        include: [
            {
                mode: Instructor,
                attributes: ["id", "name"]
            },
            {
                model: User,
                attributes: ["id", "name"]
            }
        ]
    })
        .then(dbFeedbackData => {
            if(!dbFeedbackData) {
                res.status(404).json({ message: "No instructor found with this id." });
                return;
            }
            res.json(dbFeedbackData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET all feedback from a single user /api/feedback/1
router.get("/:user_id", (req, res) => {
    Feedback.findAll({
        attributes: ["id", "review_text", "rating"],
        where: {
            user_id: req.params.user_id
        },
        include: [
            {
                mode: Bootcamp,
                attributes: ["id", "name"]
            },
            {
                model: User,
                attributes: ["id", "name"]
            }
        ]
    })
        .then(dbFeedbackData => {
            if(!dbFeedbackData) {
                res.status(404).json({ message: "No user found with this id." });
                return;
            }
            res.json(dbFeedbackData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST create feedback /api/feedback
router.post("/", (req, res) => {
    Feedback.create({
        review_text: req.body.review_text,
        rating: req.body.rating,
        //change to req.session.user_id
        user_id: req.body.user_id,
        instructor_id: req.body.instructor_id,
        bootcamp_id: req.body.bootcamp_id
    })
        .then(dbFeedbackData => res.json(dbFeedbackData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//PUT update feedback /api/feedback/1
router.put("/:id", (req, res) => {
    Feedback.update(
        {
            review_text: req.body.review_text,
            rating: req.body.rating
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbFeedbackData => {
            if(!dbFeedbackData) {
                res.status(404).json({ message: "No feedback found with this id." });
                return;
            }
            res.json(dbFeedbackData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//DELETE feedback /api/feedback/1
router.delete("/:id", (req, res) => {
    Feedback.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbFeedbackData => {
            if(!dbFeedbackData) {
                res.status(400).json({ message: "No feedback found with this id." });
                return;
            }
            res.json(dbFeedbackData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;