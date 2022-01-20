const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Bootcamp, Instructor, Feedback } = require("../models");

//Dashboard page /dashboard/
router.get("/", (req, res) => {

});

//Edit feedback page /dashboard/edit/:id
router.get("/edit/:id", (req, res) => {

});

module.exports = router;