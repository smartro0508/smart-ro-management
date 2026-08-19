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
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Sale',
  },
  customerData: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  totalDiscount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  },
  taxableAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  },
  isGstApplied: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  cgst: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  },
  sgst: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  },
  igst: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  },
  roundOff: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  },
  grandTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  }
});

// Auto-generate invoiceNumber before creation
Invoice.beforeValidate(async (invoice, options) => {
  if (!invoice.invoiceNumber) {
    const lastInvoice = await Invoice.findOne({
      order: [['createdAt', 'DESC']],
      attributes: ['invoiceNumber']
    });
    let nextNum = 1001;
    if (lastInvoice && lastInvoice.invoiceNumber) {
      const match = lastInvoice.invoiceNumber.match(/\d+$/);
      if (match) {
        nextNum = parseInt(match[0], 10) + 1;
      }
    }
    invoice.invoiceNumber = `INV-${nextNum}`;
  }
});

export default Invoice;
