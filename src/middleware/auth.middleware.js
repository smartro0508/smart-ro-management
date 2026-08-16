import { verifyToken } from '../utils/jwt.js';
import { Admin } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  const decoded = verifyToken(token);

  const currentAdmin = await Admin.findByPk(decoded.id);
  if (!currentAdmin) {
    return next(new AppError('The admin belonging to this token does no longer exist.', 401));
  }

  req.admin = currentAdmin;
  next();
});
