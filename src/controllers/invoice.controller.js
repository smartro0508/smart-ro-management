import { Invoice } from '../models/index.js';
import { Op } from 'sequelize';
import asyncHandler from '../utils/asyncHandler.js';
import { AppError } from '../utils/apiResponse.js';

export const createInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.create(req.body);
  return res.success(invoice, 'Invoice created successfully', 201);
});

export const getInvoices = asyncHandler(async (req, res) => {
  const { fromDate, toDate } = req.body;
  const where = {};
  
  if (fromDate && toDate) {
    where.createdAt = {
      [Op.between]: [new Date(fromDate), new Date(toDate + 'T23:59:59.999Z')]
    };
  }
  
  const invoices = await Invoice.findAll({ where, order: [['createdAt', 'DESC']] });
  return res.success(invoices, 'Invoices fetched successfully', 200);
});

export const getInvoiceById = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findByPk(req.params.id);
  if (!invoice) throw new AppError('Invoice not found', 404);
  return res.success(invoice, 'Invoice fetched successfully', 200);
});

export const updateInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findByPk(req.params.id);
  if (!invoice) throw new AppError('Invoice not found', 404);
  await invoice.update(req.body);
  return res.success(invoice, 'Invoice updated successfully', 200);
});

export const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findByPk(req.params.id);
  if (!invoice) throw new AppError('Invoice not found', 404);
  await invoice.destroy();
  return res.success(undefined, 'Invoice deleted successfully', 200);
});
