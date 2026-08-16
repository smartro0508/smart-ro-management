import * as adminService from '../services/admin.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import messages from '../constants/messages.js';

export const getAdmins = asyncHandler(async (req, res) => {
  const admins = await adminService.getAllAdmins();
  return res.success(admins, messages.FETCHED, 200);
});

export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await adminService.getAdminById(req.admin.id);
  return res.success(admin, 'Profile fetched successfully', 200);
});

export const updateAdmin = asyncHandler(async (req, res) => {
  await adminService.updateAdmin(req.params.id, req.body);
  return res.success(undefined, 'User updated successfully', 200);
});
