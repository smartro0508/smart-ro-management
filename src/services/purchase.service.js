import { Purchase } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';

export const createPurchase = async (data) => {
  return await Purchase.create(data);
};

export const getAllPurchases = async () => {
  return await Purchase.findAll({ order: [['purchaseDate', 'DESC']] });
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
