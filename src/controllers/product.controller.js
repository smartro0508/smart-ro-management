import * as productService from '../services/product.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import messages from '../constants/messages.js';

export const createProduct = asyncHandler(async (req, res) => {
  await productService.createProduct(req.body);
  return res.success(undefined, messages.CREATED, 201);
});

export const getProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts();
  return res.success(products, messages.FETCHED, 200);
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  return res.success(product, messages.FETCHED, 200);
});

export const updateProduct = asyncHandler(async (req, res) => {
  await productService.updateProduct(req.params.id, req.body);
  return res.success(undefined, messages.UPDATED, 200);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  return res.success(undefined, messages.DELETED, 200);
});

export const searchProducts = asyncHandler(async (req, res) => {
  const query = req.query.q || req.body.q;
  const products = await productService.searchProducts(query);
  return res.success(products, messages.FETCHED, 200);
});
