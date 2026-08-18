import fs from 'fs';
import path from 'path';
import { Service } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';
import { Op } from 'sequelize';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deleteImagesFromDisk = (imageNames) => {
  if (!imageNames || !Array.isArray(imageNames)) return;
  const uploadDir = path.join(__dirname, '../../uploads/images');
  imageNames.forEach(img => {
    if (img) {
      const imgPath = path.join(uploadDir, img);
      if (fs.existsSync(imgPath)) {
        try { fs.unlinkSync(imgPath); } catch (e) {}
      }
    }
  });
};

export const createService = async (data) => {
  if (data.keypoints && typeof data.keypoints === 'string') {
    try { data.keypoints = JSON.parse(data.keypoints); } catch (e) {}
  }
  
  try {
    return await Service.create(data);
  } catch (error) {
    const imagesToDelete = [];
    if (data.image) imagesToDelete.push(data.image);
    deleteImagesFromDisk(imagesToDelete);
    throw error;
  }
};

export const getAllServices = async () => {
  return await Service.findAll();
};

export const getServiceById = async (id) => {
  const service = await Service.findByPk(id);
  if (!service) throw new AppError('Service not found', 404);
  return service;
};

export const updateService = async (id, data) => {
  const service = await getServiceById(id);
  
  if (data.keypoints && typeof data.keypoints === 'string') {
    try { data.keypoints = JSON.parse(data.keypoints); } catch (e) {}
  }

  try {
    const updated = await service.update(data);
    
    const imagesToDelete = [];
    if (data.image && service.image && data.image !== service.image) {
      imagesToDelete.push(service.image);
    }
    deleteImagesFromDisk(imagesToDelete);
    
    return updated;
  } catch (error) {
    const imagesToDelete = [];
    if (data.image && data.image !== service.image) {
      imagesToDelete.push(data.image);
    }
    deleteImagesFromDisk(imagesToDelete);
    throw error;
  }
};

export const deleteService = async (id) => {
  const service = await getServiceById(id);
  
  const imagesToDelete = [];
  if (service.image) imagesToDelete.push(service.image);

  await service.destroy();
  deleteImagesFromDisk(imagesToDelete);
};

export const searchServices = async (query) => {
  if (!query) return await Service.findAll();
  return await Service.findAll({
    where: {
      [Op.or]: [
        { servicename: { [Op.like]: `%${query}%` } },
        { description: { [Op.like]: `%${query}%` } }
      ]
    }
  });
};
