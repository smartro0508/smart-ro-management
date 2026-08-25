import { InvoiceServices } from '../models/index.js';
import { Op } from 'sequelize';

export const createService = async (data) => InvoiceServices.create(data);
export const getAllServices = async () => InvoiceServices.findAll({ order: [['createdAt', 'DESC']] });
export const getServiceById = async (id) => InvoiceServices.findByPk(id);
export const updateService = async (id, data) => InvoiceServices.update(data, { where: { id } });
export const deleteService = async (id) => InvoiceServices.destroy({ where: { id } });
export const searchServices = async (query) => InvoiceServices.findAll({
  where: { servicename: { [Op.like]: `%${query}%` } }
});