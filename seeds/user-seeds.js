const { User } = require('../models');

const userData = [
    {
        username: 'bphelps',
        email: 'brody@aol.com',
        password: 'rootroot'
    },
    {
        username: 'gsawyer',
        email: 'garry@aol.com',
        password: 'rootroot'
    },
    {
        username: 'amorton',
        email: 'andy@aol.com',
        password: 'rootroot'
    },
    {
        username: 'rjohns',
        email: 'randy@aol.com',
        password: 'rootroot'
    },
    {
        username: 'erichard',
        email: 'ed@aol.com',
        password: 'rootroot'
    }
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;