import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Gallery = sequelize.define('Gallery', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default Gallery;
