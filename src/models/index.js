import Admin from './admin.model.js';
import RefreshToken from './refreshToken.model.js';
import Customer from './customer.model.js';
import Product from './product.model.js';
import ContactUs from './contactUs.model.js';
import Testimonial from './testimonial.model.js';
import { sequelize } from '../config/database.js';

Admin.hasMany(RefreshToken, {
  foreignKey: 'adminId',
  as: 'refreshTokens',
  onDelete: 'CASCADE'
});

RefreshToken.belongsTo(Admin, {
  foreignKey: 'adminId',
  as: 'admin'
});

export {
  Admin,
  RefreshToken,
  Customer,
  Product,
  ContactUs,
  Testimonial,
  sequelize
};
