const bcrypt = require("bcrypt");
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {
    //Add bcrypt
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
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
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 8);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 8);
                return updatedUserData;
            }
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "user"
    }
);


module.exports = User;