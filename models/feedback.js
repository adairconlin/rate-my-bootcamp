const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");

class Feedback extends Model {}

Feedback.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primarykey: true,
            autoIncrement: true
        },
        review_text: {
            type: DataTypes.STRING,
            allowNull: true
        },
        //foreignKey
        instructor_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        //foreignKey
        bootcamp_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        //foreignKey
        user_id: {
            allowNull: false,

        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "feedback"
    }
)

module.exports = Feedback;