"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Order.init(
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Product name should be filled",
          },
          notNull: {
            msg: "Product name should be filled",
          },
        },
      },
      productQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            msg: "Minimum price should be 1 pcs",
            args: 1,
          },
          notEmpty: {
            msg: "Product qty should be filled",
          },
          notNull: {
            msg: "Product qty should be filled",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            msg: "Minimum price should be 1 Rupiah",
            args: 1,
          },
          notEmpty: {
            msg: "Product price should be filled",
          },
          notNull: {
            msg: "Product price should be filled",
          },
        },
      },
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
