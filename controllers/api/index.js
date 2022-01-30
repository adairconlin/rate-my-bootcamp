const router = require("express").Router();

const userRoutes = require("./user-routes");
const instructorRoutes = require("./instructor-routes");
const bootcampRoutes = require("./bootcamp-routes");
const feedbackRoutes = require("./feedback-routes");

router.use("/users", userRoutes);
router.use("/instructors", instructorRoutes);
router.use("/bootcamps", bootcampRoutes);
router.use("/feedback", feedbackRoutes);

module.exports = router;