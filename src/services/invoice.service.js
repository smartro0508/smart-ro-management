import Invoice from '../models/invoice.model.js';
import { AppError } from '../utils/apiResponse.js';
import Customer from '../models/customer.model.js';

import messages from '../constants/messages.js';

import { Op } from 'sequelize';

export const createInvoice = async (invoiceData) => {
  try {
    const invoice = await Invoice.create(invoiceData);
    return invoice;
  } catch (error) {
    throw new AppError(error.message || messages.SERVER_ERROR, 500);
  }
};

export const getAllInvoices = async (filters = {}) => {
  try {
    const where = {};
    
    if (filters.fromDate && filters.toDate) {
      where.invoiceDate = {
        [Op.between]: [filters.fromDate, filters.toDate]
      };
    } else if (filters.fromDate) {
      where.invoiceDate = { [Op.gte]: filters.fromDate };
    } else if (filters.toDate) {
      where.invoiceDate = { [Op.lte]: filters.toDate };
    }

    const page = filters.page ? parseInt(filters.page, 10) : 1;
    const limit = filters.limit ? parseInt(filters.limit, 10) : 30;
    const offset = (page - 1) * limit;

    const invoices = await Invoice.findAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
    return invoices;
  } catch (error) {
    throw new AppError(error.message || messages.SERVER_ERROR, 500);
  }
};

export const getInvoiceById = async (id) => {
  try {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) throw new AppError(messages.NOT_FOUND, 404);
    return invoice;
  } catch (error) {
    throw new AppError(error.message || messages.SERVER_ERROR, error.statusCode || 500);
  }
};

export const updateInvoice = async (id, invoiceData) => {
  try {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) throw new AppError(messages.NOT_FOUND, 404);
    
    await invoice.update(invoiceData);
    return invoice;
  } catch (error) {
    throw new AppError(error.message || messages.SERVER_ERROR, error.statusCode || 500);
  }
};

export const deleteInvoice = async (id) => {
  try {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) throw new AppError(messages.NOT_FOUND, 404);
    
    await invoice.destroy();
    return true;
  } catch (error) {
    throw new AppError(error.message || messages.SERVER_ERROR, error.statusCode || 500);
  }
};
