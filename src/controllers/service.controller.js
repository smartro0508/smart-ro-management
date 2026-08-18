import * as serviceService from '../services/service.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import messages from '../constants/messages.js';

export const createService = asyncHandler(async (req, res) => {
  await serviceService.createService(req.body);
  return res.success(undefined, messages.CREATED || 'Created successfully', 201);
});

export const getServices = asyncHandler(async (req, res) => {
  const services = await serviceService.getAllServices();
  return res.success(services, messages.FETCHED || 'Fetched successfully', 200);
});

export const getService = asyncHandler(async (req, res) => {
  const service = await serviceService.getServiceById(req.params.id);
  return res.success(service, messages.FETCHED || 'Fetched successfully', 200);
});

export const updateService = asyncHandler(async (req, res) => {
  await serviceService.updateService(req.params.id, req.body);
  return res.success(undefined, messages.UPDATED || 'Updated successfully', 200);
});

export const deleteService = asyncHandler(async (req, res) => {
  await serviceService.deleteService(req.params.id);
  return res.success(undefined, messages.DELETED || 'Deleted successfully', 200);
});

export const searchServices = asyncHandler(async (req, res) => {
  const query = req.query.q || req.body.q;
  const services = await serviceService.searchServices(query);
  return res.success(services, messages.FETCHED || 'Fetched successfully', 200);
});
