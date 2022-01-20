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
            allowNull: true,
            references: {
                model: Instructor,
                key: "id"
            }
        },
        //foreignKey
        bootcamp_id: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: Bootcamp,
                key: "id"
            }
        },
        //foreignKey
        user_id: {
            allowNull: false,
            references: {
                model: User,
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