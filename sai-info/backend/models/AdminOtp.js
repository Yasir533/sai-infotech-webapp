const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AdminOtp = sequelize.define('AdminOtp', {
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
  otpHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verifiedAt: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
}, {
  timestamps: true,
});

// Serialize _id virtual for frontend backwards compatibility
AdminOtp.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  values._id = values.id.toString();
  return values;
};
Object.defineProperty(AdminOtp.prototype, '_id', {
  get() {
    return this.id ? this.id.toString() : undefined;
  }
});

module.exports = AdminOtp;