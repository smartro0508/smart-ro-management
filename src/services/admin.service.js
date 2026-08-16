import { Admin } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';

export const getAllAdmins = async () => {
  const admins = await Admin.findAll();
  return admins;
};

export const getAdminById = async (id) => {
  const admin = await Admin.findByPk(id);
  if (!admin) {
    throw new AppError('Admin not found', 404);
  }
  return admin;
};

export const updateAdmin = async (id, data) => {
  const admin = await Admin.findByPk(id);
  if (!admin) throw new AppError('Admin not found', 404);
  
  if (!data.password) {
    delete data.password;
  }
  await admin.update(data);
};
