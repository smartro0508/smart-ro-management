import * as bankService from '../services/bank.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import messages from '../constants/messages.js';

export const createBank = asyncHandler(async (req, res) => {
  await bankService.createBank(req.body);
  return res.success(undefined, messages.CREATED || 'Bank created successfully', 201);
});

export const updateBank = asyncHandler(async (req, res) => {
  await bankService.updateBank(req.body);
  return res.success(undefined, messages.UPDATED || 'Bank updated successfully', 200);
});

export const getBank = asyncHandler(async (req, res) => {
  const bank = await bankService.getBank();
  return res.success(bank, messages.FETCHED || 'Bank fetched successfully', 200);
});

