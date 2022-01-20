const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");

class Feedback extends Model {}

Feedback.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        review_text: {
            type: DataTypes.STRING,
            allowNull: true
        },
        //foreignKey
        instructor_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "instructor",
                key: "id"
            }
        },
        //foreignKey
        bootcamp_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "bootcamp",
                key: "id"
            }
        },
        //foreignKey
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id"
            }

        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: 10
            }
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