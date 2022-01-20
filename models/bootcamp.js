const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bootcamp extends Model {}

Bootcamp.init( 
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primarykey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "bootcamp"
    }
)

module.exports = Bootcamp;