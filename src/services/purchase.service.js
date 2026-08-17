import { Purchase } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';
import { Op } from 'sequelize';

export const createPurchase = async (data) => {
  return await Purchase.create(data);
};

export const getAllPurchases = async (filters = {}) => {
  const where = {};
  if (filters.fromDate && filters.toDate) {
    where.purchaseDate = {
      [Op.between]: [new Date(filters.fromDate), new Date(filters.toDate + 'T23:59:59.999Z')]
    };
  }
  return await Purchase.findAll({ where, order: [['purchaseDate', 'DESC']] });
};

export const getPurchaseById = async (id) => {
  const purchase = await Purchase.findByPk(id);
  if (!purchase) throw new AppError('Purchase not found', 404);
  return purchase;
};

export const updatePurchase = async (id, data) => {
  const purchase = await getPurchaseById(id);
  return await purchase.update(data);
};

export const deletePurchase = async (id) => {
  const purchase = await getPurchaseById(id);
  return await purchase.destroy();
};
