import { User } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Check if user exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new AppError('Email already in use', 400);
  }

  // Create user
  const user = await User.create({ name, email, password });
  
  // Exclude password from returned object
  const userWithoutPassword = user.toJSON();
  delete userWithoutPassword.password;

  const token = generateToken({ id: user.id });

  return { user: userWithoutPassword, token };
};

export const loginUser = async (email, password) => {
  // Find user with password
  const user = await User.scope('withPassword').findOne({ where: { email } });
  
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Incorrect email or password', 401);
  }

  // Exclude password from returned object
  const userWithoutPassword = user.toJSON();
  delete userWithoutPassword.password;

  const token = generateToken({ id: user.id });

  return { user: userWithoutPassword, token };
};
