import { Product } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';

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
  return await product.destroy();
};
