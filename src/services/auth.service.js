import { Admin } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';
import { generateToken } from '../utils/jwt.js';

export const registerAdmin = async (adminData) => {
  const { name, email, password } = adminData;

  const existingAdmin = await Admin.findOne({ where: { email } });
  if (existingAdmin) {
    throw new AppError('Email already in use', 400);
  }

  const admin = await Admin.create({ name, email, password });
  
  const adminWithoutPassword = admin.toJSON();
  delete adminWithoutPassword.password;

  const token = generateToken({ id: admin.id });

  return { admin: adminWithoutPassword, token };
};

export const loginAdmin = async (email, password) => {
  const admin = await Admin.scope('withPassword').findOne({ where: { email } });
  
  if (!admin || !(await admin.comparePassword(password))) {
    throw new AppError('Incorrect email or password', 401);
  }

  const adminWithoutPassword = admin.toJSON();
  delete adminWithoutPassword.password;

  const token = generateToken({ id: admin.id });

  return { admin: adminWithoutPassword, token };
};
