'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toSafeObject() {
      // context will be the User instance
      const { id, firstName, lastName, email } = this;
      return { id, firstName, lastName, email };
    }
    
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
      },
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
      validate: {
        len: [60, 60],
      },
    },
  }, {
    sequelize,
    modelName: 'Customer',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
      },
    },
  });
  return Customer;
};