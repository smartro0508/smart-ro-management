import { ContactUs } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';

export const createContactUs = async (data) => {
  return await ContactUs.create(data);
};

export const getAllContactUs = async () => {
  return await ContactUs.findAll();
};

export const getContactUsById = async (id) => {
  const contact = await ContactUs.findByPk(id);
  if (!contact) throw new AppError('Contact submission not found', 404);
  return contact;
};

export const updateContactUsStatus = async (id, status) => {
  const contact = await getContactUsById(id);
  return await contact.update({ status });
};

export const deleteContactUs = async (id) => {
  const contact = await getContactUsById(id);
  return await contact.destroy();
};
