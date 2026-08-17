import { ContactUs } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';
import { Op } from 'sequelize';

export const createContactUs = async (data) => {
  return await ContactUs.create(data);
};

export const getAllContactUs = async (filters = {}) => {
  const where = {};
  if (filters.fromDate && filters.toDate) {
    where.createdAt = {
      [Op.between]: [new Date(filters.fromDate), new Date(filters.toDate + 'T23:59:59.999Z')]
    };
  }
  return await ContactUs.findAll({ where, order: [['createdAt', 'DESC']] });
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
