const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const db = require('../db/schema.sql');

class Bootcamp extends Model {}

Bootcamp.init( 
    {
        id: {
            primarykey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    sequelize
)

module.exports = Bootcamp;