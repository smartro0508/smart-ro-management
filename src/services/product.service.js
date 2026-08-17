import fs from 'fs';
import path from 'path';
import { Product } from '../models/index.js';
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

export const createProduct = async (data) => {
  let baseSlug = data.slug || (data.name ? data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : '');
  if (baseSlug) {
    let slug = baseSlug;
    let counter = 1;
    while (await Product.findOne({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    data.slug = slug;
  }
  if (data.features && typeof data.features === 'string') {
    try { data.features = JSON.parse(data.features); } catch (e) {}
  }
  if (data.specifications && typeof data.specifications === 'string') {
    try { data.specifications = JSON.parse(data.specifications); } catch (e) {}
  }
  if (data.discount === '') data.discount = null;
  if (data.originalPrice === '') data.originalPrice = null;
  if (data.isFeatured === 'true') data.isFeatured = true;
  if (data.isFeatured === 'false') data.isFeatured = false;
  
  try {
    return await Product.create(data);
  } catch (error) {
    const imagesToDelete = [];
    if (data.mainImage) imagesToDelete.push(data.mainImage);
    if (data.images && Array.isArray(data.images)) imagesToDelete.push(...data.images);
    deleteImagesFromDisk(imagesToDelete);
    throw error;
  }
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
  
  if (data.slug || data.name) {
    let baseSlug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let slug = baseSlug;
    let counter = 1;
    while (await Product.findOne({ where: { slug, id: { [Op.ne]: id } } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    data.slug = slug;
  }
  if (data.features && typeof data.features === 'string') {
    try { data.features = JSON.parse(data.features); } catch (e) {}
  }
  if (data.specifications && typeof data.specifications === 'string') {
    try { data.specifications = JSON.parse(data.specifications); } catch (e) {}
  }
  if (data.discount === '') data.discount = null;
  if (data.originalPrice === '') data.originalPrice = null;
  if (data.isFeatured === 'true') data.isFeatured = true;
  if (data.isFeatured === 'false') data.isFeatured = false;

  try {
    const updated = await product.update(data);
    
    const imagesToDelete = [];
    if (data.mainImage && product.mainImage && data.mainImage !== product.mainImage) {
      imagesToDelete.push(product.mainImage);
    }
    if (data.images && Array.isArray(data.images)) {
      const oldImages = Array.isArray(product.images) ? product.images : [];
      oldImages.forEach(img => {
        if (!data.images.includes(img)) imagesToDelete.push(img);
      });
    }
    deleteImagesFromDisk(imagesToDelete);
    
    return updated;
  } catch (error) {
    const imagesToDelete = [];
    if (data.mainImage && data.mainImage !== product.mainImage) {
      imagesToDelete.push(data.mainImage);
    }
    if (data.images && Array.isArray(data.images)) {
      const oldImages = Array.isArray(product.images) ? product.images : [];
      data.images.forEach(img => {
        if (!oldImages.includes(img)) imagesToDelete.push(img);
      });
    }
    deleteImagesFromDisk(imagesToDelete);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  const product = await getProductById(id);
  
  const imagesToDelete = [];
  if (product.mainImage) imagesToDelete.push(product.mainImage);
  if (product.images) {
    let imagesArr = product.images;
    if (typeof imagesArr === 'string') {
      try { imagesArr = JSON.parse(imagesArr); } catch (e) { imagesArr = []; }
    }
    if (Array.isArray(imagesArr)) imagesToDelete.push(...imagesArr);
  }

  await product.destroy();
  deleteImagesFromDisk(imagesToDelete);
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
