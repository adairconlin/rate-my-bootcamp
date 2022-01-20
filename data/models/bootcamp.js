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
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primarykey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            bootcamp: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        feedback: {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primarykey: true,
                autoIncrement: true
            },
            review_text: {
                type: DataTypes.STRING,
                allowNull: false
                validate: {
                    len: [75]
                }
            },
            instructor_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            bootcamp_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                allowNull: false,
    
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        user: {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primarykey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len:[8]
                }
            }
        },
    })
    module.exports = Bootcamp;