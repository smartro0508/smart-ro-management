import { User } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';

export const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

export const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};
