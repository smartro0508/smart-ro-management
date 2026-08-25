import InvoiceProducts from '../models/invoiceProduct.model.js';
import { Op } from 'sequelize';

export const createProduct = async (data) => InvoiceProducts.create(data);
export const getAllProducts = async () => InvoiceProducts.findAll({ order: [['createdAt', 'DESC']] });
export const getProductById = async (id) => InvoiceProducts.findByPk(id);
export const updateProduct = async (id, data) => InvoiceProducts.update(data, { where: { id } });
export const deleteProduct = async (id) => InvoiceProducts.destroy({ where: { id } });
export const searchProducts = async (query) => InvoiceProducts.findAll({
  where: { productname: { [Op.like]: `%${query}%` } }
});