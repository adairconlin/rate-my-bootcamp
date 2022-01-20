const { Model, DataTypes } = require('sequelize');
class Bootcamp {
    constructor(name, id) {
        this.id = id;
        this.name = name;
    }
}

    getName() {
        return this.name
    }

    getId() {
        return this.id
    }
    
    module.exports = Bootcamp;