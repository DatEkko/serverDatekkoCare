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
            Disease.belongsTo(models.Organ, { foreignKey: "organ_id" });
            Disease.hasMany(models.Treatment, { foreignKey: "disease_id" });
        }
    }
    Disease.init({
        organ_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        image: DataTypes.TEXT,
        description: DataTypes.TEXT,
        cre: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Disease',
    });
    return Disease;
};