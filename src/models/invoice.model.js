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
  },
  paymentmethod: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paymentstatus: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Unpaid',
  },
  termsnotes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  whatsappreminderdate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  whatsappremindersent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  whatsappremindersentat: {
    type: DataTypes.DATE,
    allowNull: true,
  }
});

// Auto-generate invoiceNumber before creation
Invoice.beforeValidate(async (invoice, options) => {
  if (invoice.invoiceDate && !invoice.whatsappreminderdate) {
    const reminderDate = new Date(invoice.invoiceDate);
    reminderDate.setDate(reminderDate.getDate() + 120);
    invoice.whatsappreminderdate = reminderDate;
  }

  if (!invoice.invoiceNumber) {
    const isGst = invoice.isGstApplied === true || invoice.isGstApplied === 'true';

    // Find the last invoice in the same sequence
    const lastInvoice = await Invoice.findOne({
      where: {
        isGstApplied: isGst
      },
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

    // Use different prefixes to maintain separate sequences without affecting existing data
    invoice.invoiceNumber = isGst ? `INV-${nextNum}` : `NINV-${nextNum}`;
  }
});

export default Invoice;
