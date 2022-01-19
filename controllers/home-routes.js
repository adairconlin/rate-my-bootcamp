const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Bootcamp, Instructor, Feedback } = require("../models");

router.get("/", (req, res) => {

});

router.get("/login", (req, res) => {

});

router.get("/bootcamps", (req, res) => {

});

router.get("/bootcamp/:id", (req, res) => {

});

router.get("/instructors", (req, res) => {

});

router.get("/instructor/:id", (req, res) => {

});

module.exports = router;