const { Model, DataTypes } = require('sequelize');
const { Sequelize } = require('../../../rate-my-bootcamp/config/connection');
const db = require('../db/schema.sql');

class Bootcamp {
    constructor(name, id) {
        this.id = id;
        this.name = name;
    }
}

    getName() {
        return this.name
    }

    getId() {
        return this.id
    }

    const Bootcamp = db.define('bootcamp' {
        instructor: {
            type: Sequelize.STRING
        },
        feedback: {
            type: Sequelize.STRING
        },
        user: {
            type: Sequelize.STRING
        },
    })
    module.exports = Bootcamp;