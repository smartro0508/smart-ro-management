import { Setting } from '../models/index.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getSettings = asyncHandler(async (req, res) => {
  let setting = await Setting.findOne();
  if (!setting) {
    setting = await Setting.create({});
  }
  return res.success(setting, 'Settings fetched successfully', 200);
});

export const updateSettings = asyncHandler(async (req, res) => {
  let setting = await Setting.findOne();
  if (!setting) {
    setting = await Setting.create(req.body);
  } else {
    await setting.update(req.body);
  }
  return res.success(setting, 'Settings updated successfully', 200);
});
