import { Customer } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';
import { Op } from 'sequelize';

export const createCustomer = async (data) => {
  if (data.email) {
    const existing = await Customer.findOne({ where: { email: data.email } });
    if (existing) {
      throw new AppError('A customer with this email already exists', 400);
    }
  } else {
    data.email = null;
  }
  
  if (data.phoneNumber) {
    const existingPhone = await Customer.findOne({ where: { phoneNumber: data.phoneNumber } });
    if (existingPhone) {
      throw new AppError('Alredy exists this customer', 400);
    }
  }

  return await Customer.create(data);
};

export const getAllCustomers = async (filters = {}) => {
  const where = {};
  if (filters.fromDate && filters.toDate) {
    where.createdAt = {
      [Op.between]: [new Date(filters.fromDate), new Date(filters.toDate + 'T23:59:59.999Z')]
    };
  }

  const page = filters.page ? parseInt(filters.page, 10) : 1;
  const limit = filters.limit ? parseInt(filters.limit, 10) : 30;
  const offset = (page - 1) * limit;

  return await Customer.findAll({ 
    where, 
    limit, 
    offset, 
    order: [['createdAt', 'DESC']] 
  });
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

export const searchCustomers = async (query) => {
  if (!query) return await Customer.findAll();
  return await Customer.findAll({
    where: {
      [Op.or]: [
        { fullName: { [Op.like]: `%${query}%` } },
        { email: { [Op.like]: `%${query}%` } },
        { phoneNumber: { [Op.like]: `%${query}%` } },
        { city: { [Op.like]: `%${query}%` } },
        { state: { [Op.like]: `%${query}%` } }
      ]
    }
  });
};
