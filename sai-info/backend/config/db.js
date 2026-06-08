const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

let sequelize;

if (process.env.MYSQL_URI) {
  sequelize = new Sequelize(process.env.MYSQL_URI, {
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
    },
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || 'sai_infotech',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      dialect: 'mysql',
      logging: false,
      define: {
        timestamps: true,
      },
    }
  );
}

module.exports = sequelize;
