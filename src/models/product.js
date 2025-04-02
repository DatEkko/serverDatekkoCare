'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Product.belongsTo(models.Allcode, { foreignKey: "type_product", targetKey: "key_code", as: "TypeProduct" })
            Product.belongsTo(models.Allcode, { foreignKey: "type_condition", targetKey: "key_code", as: "TypeCondition" })
        }
    }
    Product.init({
        type_product: DataTypes.INTEGER, // PRODUCT - thuộc giống cây nào
        type_condition: DataTypes.INTEGER, // CONDITION - trong nhà hay ngoài trời
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.TEXT,
        price: DataTypes.DECIMAL(10, 2),
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};