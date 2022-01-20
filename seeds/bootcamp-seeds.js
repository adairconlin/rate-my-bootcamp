const { Bootcamp } = require('../models');

const bootcampData = [
    {
        name: 'University of Minnesota Coding Bootcamp'
    },
    {
        name: 'University of Madison Data Visualization Bootcamp'
    },
    {
        name: 'USC UX/UI Bootcamp'
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