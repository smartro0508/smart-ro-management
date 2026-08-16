import * as purchaseService from '../services/purchase.service.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createPurchase = asyncHandler(async (req, res) => {
  await purchaseService.createPurchase(req.body);
  return res.success(undefined, 'Purchase created successfully', 201);
});

export const getPurchases = asyncHandler(async (req, res) => {
  const purchases = await purchaseService.getAllPurchases();
  return res.success(purchases, 'Purchases fetched successfully', 200);
});

export const getPurchase = asyncHandler(async (req, res) => {
  const purchase = await purchaseService.getPurchaseById(req.params.id);
  return res.success(purchase, 'Purchase fetched successfully', 200);
});

export const updatePurchase = asyncHandler(async (req, res) => {
  await purchaseService.updatePurchase(req.params.id, req.body);
  return res.success(undefined, 'Purchase updated successfully', 200);
});

export const deletePurchase = asyncHandler(async (req, res) => {
  await purchaseService.deletePurchase(req.params.id);
  return res.success(undefined, 'Purchase deleted successfully', 200);
});
