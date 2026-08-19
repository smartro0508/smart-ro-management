import * as invoiceService from '../services/invoice.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import messages from '../constants/messages.js';

export const createInvoice = asyncHandler(async (req, res) => {
  const invoice = await invoiceService.createInvoice(req.body);
  return res.success(invoice, messages.CREATED, 201);
});

export const getInvoices = asyncHandler(async (req, res) => {
  const { fromDate, toDate } = req.body;
  const invoices = await invoiceService.getAllInvoices({ fromDate, toDate });
  return res.success(invoices, messages.FETCHED, 200);
});

export const getInvoice = asyncHandler(async (req, res) => {
  const invoice = await invoiceService.getInvoiceById(req.params.id);
  return res.success(invoice, messages.FETCHED, 200);
});

export const deleteInvoice = asyncHandler(async (req, res) => {
  await invoiceService.deleteInvoice(req.params.id);
  return res.success(null, messages.DELETED || 'Deleted successfully', 200);
});
