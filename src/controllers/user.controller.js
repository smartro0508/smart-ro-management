import * as userService from '../services/user.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import messages from '../constants/messages.js';

export const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  return res.success(users, messages.FETCHED, 200);
});

export const getUserProfile = asyncHandler(async (req, res) => {
  // req.user is set by auth middleware
  const user = await userService.getUserById(req.user.id);
  return res.success(user, 'Profile fetched successfully', 200);
});
