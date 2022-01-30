// imports models
const Bootcamp = require('./bootcamp');
const Instructor = require('./instructor');
const Feedback = require('./feedback');
const User = require('./user');

User.hasMany(Feedback, {
    foreignKey: "user_id"
});

Feedback.belongsTo(User, {
    foreignKey: "user_id"
});

Instructor.hasMany(Feedback, {
    foreignKey: "instructor_id"
});

Feedback.belongsTo(Instructor, {
    foreignKey: "instructor_id"
});

Bootcamp.hasMany(Feedback, {
    foreignKey: "bootcamp_id"
});

Feedback.belongsTo(Bootcamp, {
    foreignKey: "bootcamp_id"
});

Bootcamp.hasMany(Instructor, {
    foreignKey: "bootcamp_id"
});

Instructor.belongsTo(Bootcamp, {
    foreignKey: "bootcamp_id"
});

module.exports = {
  Bootcamp,
  Instructor,
  Feedback,
  User,
};