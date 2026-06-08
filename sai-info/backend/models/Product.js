const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      if (value) {
        this.setDataValue('name', value.trim());
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: '',
    set(value) {
      if (value !== undefined && value !== null) {
        this.setDataValue('description', value.trim());
      }
    }
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'general',
    set(value) {
      if (value) {
        this.setDataValue('category', value.trim());
      }
    }
  },
  price: {
    type: DataTypes.STRING,
    defaultValue: '0',
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: () => [],
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

// Serialize _id virtual for frontend backwards compatibility
Product.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  values._id = values.id.toString();
  return values;
};
Object.defineProperty(Product.prototype, '_id', {
  get() {
    return this.id ? this.id.toString() : undefined;
  }
});

module.exports = Product;
