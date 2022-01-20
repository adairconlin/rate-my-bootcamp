const { Model, DataTypes } = require('sequelize');

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
            allowNull: false
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
    }
)

module.exports = Feedback;