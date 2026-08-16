import User from './user.model.js';
import RefreshToken from './refreshToken.model.js';
import { sequelize } from '../config/database.js';

// Define relationships
User.hasMany(RefreshToken, {
  foreignKey: 'userId',
  as: 'refreshTokens',
  onDelete: 'CASCADE'
});

RefreshToken.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

export {
  User,
  RefreshToken,
  sequelize
};
