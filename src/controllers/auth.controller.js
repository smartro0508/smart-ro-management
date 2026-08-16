import * as authService from '../services/auth.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import messages from '../constants/messages.js';

export const register = asyncHandler(async (req, res) => {
  await authService.registerAdmin(req.body);
  return res.success(undefined, 'Admin registered successfully', 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginAdmin(email, password);
  return res.success({ token: result.token }, 'Admin logged in successfully', 200);
});
