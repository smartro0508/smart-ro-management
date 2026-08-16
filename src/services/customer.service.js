import { Customer } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';

export const createCustomer = async (data) => {
  return await Customer.create(data);
};

export const getAllCustomers = async () => {
  return await Customer.findAll();
};

export const getCustomerById = async (id) => {
  const customer = await Customer.findByPk(id);
  if (!customer) throw new AppError('Customer not found', 404);
  return customer;
};

export const updateCustomer = async (id, data) => {
  const customer = await getCustomerById(id);
  return await customer.update(data);
};

export const deleteCustomer = async (id) => {
  const customer = await getCustomerById(id);
  return await customer.destroy();
};
