// imports models
const Bootcamp = require('./Bootcamp');
const Instructor = require('./Instructor');
const Feedback = require('./Feedback');
const User = require('./User');

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

module.exports = {
  Bootcamp,
  Instructor,
  Feedback,
  User,
};