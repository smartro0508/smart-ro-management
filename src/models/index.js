import Admin from './admin.model.js';
import RefreshToken from './refreshToken.model.js';
import Customer from './customer.model.js';
import Product from './product.model.js';
import ContactUs from './contactUs.model.js';
import Testimonial from './testimonial.model.js';
import Expense from './expense.model.js';
import Purchase from './purchase.model.js';
import Setting from './setting.model.js';
import Invoice from './invoice.model.js';
import Gallery from './gallery.model.js';
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
  Expense,
  Purchase,
  Setting,
  Invoice,
  Gallery,
  sequelize
};
