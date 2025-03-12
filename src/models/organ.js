'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Organ extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Organ.hasMany(models.Disease, { foreignKey: "organ_id" })
        }
    }
    Organ.init({
        name: DataTypes.STRING,
        image: DataTypes.TEXT,
        description: DataTypes.TEXT,
        cre: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Organ',
    });
    return Organ;
};