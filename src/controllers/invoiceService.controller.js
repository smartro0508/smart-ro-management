import * as invoiceServiceService from '../services/invoiceService.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import messages from '../constants/messages.js';

export const createService = asyncHandler(async (req, res) => {
  await invoiceServiceService.createService(req.body);
  return res.success(undefined, messages.CREATED, 201);
});
export const getServices = asyncHandler(async (req, res) => {
  const services = await invoiceServiceService.getAllServices();
  return res.success(services, messages.FETCHED, 200);
});
export const getService = asyncHandler(async (req, res) => {
  const service = await invoiceServiceService.getServiceById(req.params.id);
  return res.success(service, messages.FETCHED, 200);
});
export const updateService = asyncHandler(async (req, res) => {
  await invoiceServiceService.updateService(req.params.id, req.body);
  return res.success(undefined, messages.UPDATED, 200);
});
export const deleteService = asyncHandler(async (req, res) => {
  await invoiceServiceService.deleteService(req.params.id);
  return res.success(undefined, messages.DELETED, 200);
});
export const searchServices = asyncHandler(async (req, res) => {
  const query = req.query.q || req.body.q;
  const services = await invoiceServiceService.searchServices(query);
  return res.success(services, messages.FETCHED, 200);
});