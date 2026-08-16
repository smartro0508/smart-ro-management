import * as contactUsService from '../services/contactUs.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import messages from '../constants/messages.js';

export const createContactUs = asyncHandler(async (req, res) => {
  await contactUsService.createContactUs(req.body);
  return res.success(undefined, messages.CREATED, 201);
});

export const getContactUsList = asyncHandler(async (req, res) => {
  const contacts = await contactUsService.getAllContactUs();
  return res.success(contacts, messages.FETCHED, 200);
});

export const getContactUs = asyncHandler(async (req, res) => {
  const contact = await contactUsService.getContactUsById(req.params.id);
  return res.success(contact, messages.FETCHED, 200);
});

export const updateContactUsStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  await contactUsService.updateContactUsStatus(req.params.id, status);
  return res.success(undefined, messages.UPDATED, 200);
});

export const deleteContactUs = asyncHandler(async (req, res) => {
  await contactUsService.deleteContactUs(req.params.id);
  return res.success(undefined, messages.DELETED, 200);
});
