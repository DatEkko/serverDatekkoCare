'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Allcode.hasMany(models.Disease, { foreignKey: "type_project" })

            Allcode.hasMany(models.Product, { foreignKey: "type_product", as: "TypeByProduct" })
            Allcode.hasMany(models.Product, { foreignKey: "type_condition", as: "TypeByCondition" })
        }
    }
    Allcode.init({
        type: DataTypes.STRING,
        key_code: DataTypes.INTEGER,
        value: DataTypes.TEXT,

    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};