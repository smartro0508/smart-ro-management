import Invoice from '../models/invoice.model.js';
import { AppError } from '../utils/apiResponse.js';
import Customer from '../models/customer.model.js';

import messages from '../constants/messages.js';

import { Op } from 'sequelize';

export const createInvoice = async (invoiceData) => {
  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Ensure the hook generates a new number if retrying
      if (attempt > 1) {
        delete invoiceData.invoiceNumber;
      }
      const invoice = await Invoice.create(invoiceData);
      return invoice;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        if (attempt === maxRetries) {
          throw new AppError('Failed to generate a unique invoice number due to high concurrency. Please try again.', 409);
        }
        // Wait a short random time before retrying to stagger concurrent requests
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
        continue;
      }
      throw new AppError(error.message || messages.SERVER_ERROR, 500);
    }
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
