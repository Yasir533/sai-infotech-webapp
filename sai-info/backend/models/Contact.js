const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  phone: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  message: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  services: {
    type: DataTypes.JSON,
    defaultValue: () => [],
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
  },
}, {
  timestamps: true,
});

// Serialize _id virtual for frontend backwards compatibility
Contact.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  values._id = values.id.toString();
  return values;
};
Object.defineProperty(Contact.prototype, '_id', {
  get() {
    return this.id ? this.id.toString() : undefined;
  }
});

module.exports = Contact;