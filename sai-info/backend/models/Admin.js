const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
    set(value) {
      if (value) {
        this.setDataValue('email', value.trim().toLowerCase());
      }
    }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'admin',
  },
});

// Serialize _id virtual for frontend backwards compatibility
Admin.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  values._id = values.id.toString();
  return values;
};
Object.defineProperty(Admin.prototype, '_id', {
  get() {
    return this.id ? this.id.toString() : undefined;
  }
});

module.exports = Admin;
