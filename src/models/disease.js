'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Disease extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Disease.belongsTo(models.Allcode, { foreignKey: "type_project", targetKey: "key_code" })
        }
    }
    Disease.init({
        name: DataTypes.STRING,
        type_project: DataTypes.INTEGER,
        image: DataTypes.TEXT('long'),
        description: DataTypes.TEXT,
        cre: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Disease',
    });
    return Disease;
};