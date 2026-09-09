import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Bank = sequelize.define('Bank', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  accountholder: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bankname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountnumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ifsccode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default Bank;
