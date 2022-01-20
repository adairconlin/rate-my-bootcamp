// imports models
const Bootcamp = require('./Bootcamp');
const Instructor = require('./Instructor');
const Feedback = require('./Feedback');
const User = require('./User');

Feedback.hasMany(Instructor, {
    foreignkey: "instructor_id"
});

Instructor.belongsTo(Feedback, { 
    foreignkey: "instructor_id"
});

Feedback.hasMany({
    foreignkey: "bootcamp_id"
});

Bootcamp.belongsTo(Feedback, {
    foreignkey: "bootcamp_id"
});

Feedback.hasMany(User, {
    foreignkey: "user_id"
});

User.hasMany(Feedback, {
    foreignkey: "user_id"
});

module.exports = {
  Bootcamp,
  Instructor,
  Feedback,
  User,
};