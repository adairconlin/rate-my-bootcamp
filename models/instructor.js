const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");

class Instructor extends Model {}

Instructor.init(
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
        },
        //foreignKey
        bootcamp_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Bootcamp,
                key: "id"
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "instructor"
    }
)

module.exports = Instructor;