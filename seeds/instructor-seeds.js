const { Instructor } = require('../models');

const instructorData = [
    {
        name:'Christian Rooney',
        bootcamp_id: 3
    },
    {
        name:'Seb MacGregor',
        bootcamp_id: 2
    },
    {
        name:'Elowen Mcneill',
        bootcamp_id: 4
    },
    {
        name:'Kunal Smith',
        bootcamp_id: 5
    },
    {
        name:'Jaya Rios',
        bootcamp_id: 1
    }
];

const seedInstructors = () => Instructor.bulkCreate(instructorData);

module.exports = seedInstructors;