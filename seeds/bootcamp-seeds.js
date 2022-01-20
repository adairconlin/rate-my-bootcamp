const { Bootcamp } = require('../models');

const bootcampData = [
    {
        name: 'University of Minnesota Coding Bootcamp'
    },
    {
        name: 'University of Madison Data Visualization'
    },
    {
        name: 'USC UX/UI'
    },
    {
        name: 'Georgia Tech Python Bootcamp'
    },
    {
        name: 'Mount Sinai Medical Bootcamp'
    }
];

const seedBootcamps = () => Bootcamp.bulkcreate(bootcampData);

module.exports = seedBootcamps;