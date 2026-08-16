import * as customerService from '../services/customer.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import messages from '../constants/messages.js';

export const createCustomer = asyncHandler(async (req, res) => {
  await customerService.createCustomer(req.body);
  return res.success(undefined, messages.CREATED, 201);
});

export const getCustomers = asyncHandler(async (req, res) => {
  const customers = await customerService.getAllCustomers();
  return res.success(customers, messages.FETCHED, 200);
});

export const getCustomer = asyncHandler(async (req, res) => {
  const customer = await customerService.getCustomerById(req.params.id);
  return res.success(customer, messages.FETCHED, 200);
});

export const updateCustomer = asyncHandler(async (req, res) => {
  await customerService.updateCustomer(req.params.id, req.body);
  return res.success(undefined, messages.UPDATED, 200);
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  await customerService.deleteCustomer(req.params.id);
  return res.success(undefined, messages.DELETED, 200);
});
