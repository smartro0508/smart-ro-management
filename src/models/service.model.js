import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const ServiceModel = sequelize.define('Service', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  servicename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  keypoints: {
    type: DataTypes.JSON,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('keypoints');
      if (!rawValue) return [];
      if (typeof rawValue === 'string') {
        try { return JSON.parse(rawValue); } catch (e) { return []; }
      }
      return rawValue;
    }
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  }
});

export default ServiceModel;
