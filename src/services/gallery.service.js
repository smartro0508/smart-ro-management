import fs from 'fs';
import path from 'path';
import { Gallery } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';

export const addImage = async (data) => {
  return await Gallery.create(data);
};

export const getAllImages = async () => {
  return await Gallery.findAll({
    order: [['createdAt', 'DESC']]
  });
};

export const deleteImage = async (id) => {
  const gallery = await Gallery.findByPk(id);
  if (!gallery) throw new AppError('Image not found', 404);

  // Delete image from uploads folder
  if (gallery.image) {
    const uploadDir = path.join(process.cwd(), 'uploads', 'images');
    const imagePath = path.join(uploadDir, gallery.image);
    if (fs.existsSync(imagePath)) {
      try {
        fs.unlinkSync(imagePath);
      } catch (err) {
        console.error('Error deleting gallery image:', err);
      }
    }
  }

  return await gallery.destroy();
};
