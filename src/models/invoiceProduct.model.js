import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const InvoiceProducts = sequelize.define('InvoiceProducts', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  productname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  }
});

export default InvoiceProducts;
