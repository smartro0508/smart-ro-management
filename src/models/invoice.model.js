import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  invoiceNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  invoiceDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('Tax Invoice', 'Bill of Supply'),
    defaultValue: 'Tax Invoice',
  },
  customerData: {
    type: DataTypes.JSON, // Storing customer snapshot
    allowNull: false,
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  totalDiscount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  taxableAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  isGstApplied: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  cgst: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  sgst: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  igst: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  roundOff: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
  },
  grandTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
});

export default Invoice;
