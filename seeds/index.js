const seedBootcamps = require('./bootcamp-seeds');
const seedInstructors = require('./instructor-seeds');
const seedUsers = require('./user-seeds');
const seedFeedback = require('./feedback-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedBootcamps();
    await seedInstructors();
    await seedUsers();
    await seedFeedback();
    process.exit(0);
};

seedAll();