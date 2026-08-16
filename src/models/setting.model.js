import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Setting = sequelize.define('Setting', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  companyName: {
    type: DataTypes.STRING,
    defaultValue: 'AURO Water Solutions',
    allowNull: false,
  },
  supportEmail: {
    type: DataTypes.STRING,
    defaultValue: 'support@auro.com',
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    defaultValue: '+91 1800-RO-WATER',
    allowNull: false,
  },
  businessAddress: {
    type: DataTypes.TEXT,
    defaultValue: '123 Tech Park, Water Purifier Hub\nNew Delhi, India',
    allowNull: false,
  }
});

export default Setting;
