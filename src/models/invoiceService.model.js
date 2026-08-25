import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const InvoiceServices = sequelize.define('InvoiceServices', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  servicename: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  servicecost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  serviceproductcost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  }
});

export default InvoiceServices;
