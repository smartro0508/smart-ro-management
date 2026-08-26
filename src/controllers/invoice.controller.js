import * as invoiceService from '../services/invoice.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import messages from '../constants/messages.js';

export const createInvoice = asyncHandler(async (req, res) => {
  const invoice = await invoiceService.createInvoice(req.body);
  
  const responseData = invoice.toJSON ? invoice.toJSON() : invoice;
  const isGst = responseData.isGstApplied === true || responseData.isGstApplied === 'true';
  
  return res.success({
    ...responseData,
    invoiceId: responseData.invoiceNumber,
    invoiceType: isGst ? 'GST' : 'NON-GST'
  }, messages.CREATED, 201);
});

export const getInvoices = asyncHandler(async (req, res) => {
  const { fromDate, toDate, page, limit } = req.body;
  const invoices = await invoiceService.getAllInvoices({ fromDate, toDate, page, limit });
  return res.success(invoices, messages.FETCHED, 200);
});

export const getInvoice = asyncHandler(async (req, res) => {
  const invoice = await invoiceService.getInvoiceById(req.params.id);
  return res.success(invoice, messages.FETCHED, 200);
});

export const updateInvoice = asyncHandler(async (req, res) => {
  const invoice = await invoiceService.updateInvoice(req.params.id, req.body);
  return res.success(invoice, messages.UPDATED || 'Updated successfully', 200);
});

export const deleteInvoice = asyncHandler(async (req, res) => {
  await invoiceService.deleteInvoice(req.params.id);
  return res.success(null, messages.DELETED || 'Deleted successfully', 200);
});
