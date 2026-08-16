import { Expense } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';

export const createExpense = async (data) => {
  return await Expense.create(data);
};

export const getAllExpenses = async () => {
  return await Expense.findAll({ order: [['date', 'DESC']] });
};

export const getExpenseById = async (id) => {
  const expense = await Expense.findByPk(id);
  if (!expense) throw new AppError('Expense not found', 404);
  return expense;
};

export const updateExpense = async (id, data) => {
  const expense = await getExpenseById(id);
  return await expense.update(data);
};

export const deleteExpense = async (id) => {
  const expense = await getExpenseById(id);
  return await expense.destroy();
};
