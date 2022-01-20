const { Model, DataTypes } = require('sequelize');
const { Sequelize } = require('../../../rate-my-bootcamp/config/connection');
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
    }
)

module.exports = Bootcamp;