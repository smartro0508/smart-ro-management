import fs from 'fs';
import path from 'path';
import { Product } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';
import { Op } from 'sequelize';

export const createProduct = async (data) => {
  return await Product.create(data);
};

export const getAllProducts = async () => {
  return await Product.findAll();
};

export const getProductById = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) throw new AppError('Product not found', 404);
  return product;
};

export const updateProduct = async (id, data) => {
  const product = await getProductById(id);
  return await product.update(data);
};

export const deleteProduct = async (id) => {
  const product = await getProductById(id);
  
  // Delete related images from uploads folder
  const uploadDir = path.join(process.cwd(), 'uploads', 'images');
  
  if (product.mainImage) {
    const mainImagePath = path.join(uploadDir, product.mainImage);
    if (fs.existsSync(mainImagePath)) {
      try { fs.unlinkSync(mainImagePath); } catch (err) { console.error('Error deleting mainImage:', err); }
    }
  }

  if (product.images) {
    let imagesArr = product.images;
    if (typeof imagesArr === 'string') {
      try { imagesArr = JSON.parse(imagesArr); } catch (e) { imagesArr = []; }
    }
    if (Array.isArray(imagesArr)) {
      imagesArr.forEach((img) => {
        const imgPath = path.join(uploadDir, img);
        if (fs.existsSync(imgPath)) {
          try { fs.unlinkSync(imgPath); } catch (err) { console.error('Error deleting image:', err); }
        }
      });
    }
  }

  return await product.destroy();
};

export const searchProducts = async (query) => {
  if (!query) return await Product.findAll();
  return await Product.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${query}%` } },
        { shortDescription: { [Op.like]: `%${query}%` } }
      ]
    }
  });
};
