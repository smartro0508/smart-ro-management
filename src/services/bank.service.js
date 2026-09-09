import { Bank } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';

export const createBank = async (data) => {
  return await Bank.create(data);
};

export const getBankById = async (id) => {
  const bank = await Bank.findByPk(id);
  if (!bank) throw new AppError('Bank not found', 404);
  return bank;
};

export const updateBank = async (data) => {
  const bank = await Bank.findOne();
  if (!bank) throw new AppError('Bank not found', 404);
  return await bank.update(data);
};

export const getBank = async () => {
  return await Bank.findOne();
};
