import * as authService from '../services/auth.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import messages from '../constants/messages.js';

export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  return res.success(result, 'User registered successfully', 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);
  return res.success(result, 'Logged in successfully', 200);
});
