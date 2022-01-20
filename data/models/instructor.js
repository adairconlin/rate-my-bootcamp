const { Model, DataTypes } = require('sequelize');

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
        bootcamp: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
)

module.exports = Instructor;