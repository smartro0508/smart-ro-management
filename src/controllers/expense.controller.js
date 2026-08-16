import * as expenseService from '../services/expense.service.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createExpense = asyncHandler(async (req, res) => {
  await expenseService.createExpense(req.body);
  return res.success(undefined, 'Expense created successfully', 201);
});

export const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await expenseService.getAllExpenses();
  return res.success(expenses, 'Expenses fetched successfully', 200);
});

export const getExpense = asyncHandler(async (req, res) => {
  const expense = await expenseService.getExpenseById(req.params.id);
  return res.success(expense, 'Expense fetched successfully', 200);
});

export const updateExpense = asyncHandler(async (req, res) => {
  await expenseService.updateExpense(req.params.id, req.body);
  return res.success(undefined, 'Expense updated successfully', 200);
});

export const deleteExpense = asyncHandler(async (req, res) => {
  await expenseService.deleteExpense(req.params.id);
  return res.success(undefined, 'Expense deleted successfully', 200);
});
