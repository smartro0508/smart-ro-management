const fs = require('fs');
const path = require('path');

const baseDir = 'e:/SMART-RO/smart-ro-management/src';

const files = {
  'services/invoiceProduct.service.js': `import InvoiceProducts from '../models/invoiceProduct.model.js';
import { Op } from 'sequelize';

export const createProduct = async (data) => InvoiceProducts.create(data);
export const getAllProducts = async () => InvoiceProducts.findAll({ order: [['createdAt', 'DESC']] });
export const getProductById = async (id) => InvoiceProducts.findByPk(id);
export const updateProduct = async (id, data) => InvoiceProducts.update(data, { where: { id } });
export const deleteProduct = async (id) => InvoiceProducts.destroy({ where: { id } });
export const searchProducts = async (query) => InvoiceProducts.findAll({
  where: { productname: { [Op.like]: \`%\${query}%\` } }
});`,

  'controllers/invoiceProduct.controller.js': `import * as invoiceProductService from '../services/invoiceProduct.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import messages from '../constants/messages.js';

export const createProduct = asyncHandler(async (req, res) => {
  await invoiceProductService.createProduct(req.body);
  return res.success(undefined, messages.CREATED, 201);
});
export const getProducts = asyncHandler(async (req, res) => {
  const products = await invoiceProductService.getAllProducts();
  return res.success(products, messages.FETCHED, 200);
});
export const getProduct = asyncHandler(async (req, res) => {
  const product = await invoiceProductService.getProductById(req.params.id);
  return res.success(product, messages.FETCHED, 200);
});
export const updateProduct = asyncHandler(async (req, res) => {
  await invoiceProductService.updateProduct(req.params.id, req.body);
  return res.success(undefined, messages.UPDATED, 200);
});
export const deleteProduct = asyncHandler(async (req, res) => {
  await invoiceProductService.deleteProduct(req.params.id);
  return res.success(undefined, messages.DELETED, 200);
});
export const searchProducts = asyncHandler(async (req, res) => {
  const query = req.query.q || req.body.q;
  const products = await invoiceProductService.searchProducts(query);
  return res.success(products, messages.FETCHED, 200);
});`,

  'routes/invoiceProduct.routes.js': `import express from 'express';
import * as invoiceProductController from '../controllers/invoiceProduct.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/get-all', invoiceProductController.getProducts);
router.post('/get/:id', invoiceProductController.getProduct);
router.post('/search', invoiceProductController.searchProducts);
router.use(protect);
router.post('/create', invoiceProductController.createProduct);
router.post('/update/:id', invoiceProductController.updateProduct);
router.post('/delete/:id', invoiceProductController.deleteProduct);
export default router;`,

  'services/invoiceService.service.js': `import InvoiceServices from '../models/invoiceService.model.js';
import { Op } from 'sequelize';

export const createService = async (data) => InvoiceServices.create(data);
export const getAllServices = async () => InvoiceServices.findAll({ order: [['createdAt', 'DESC']] });
export const getServiceById = async (id) => InvoiceServices.findByPk(id);
export const updateService = async (id, data) => InvoiceServices.update(data, { where: { id } });
export const deleteService = async (id) => InvoiceServices.destroy({ where: { id } });
export const searchServices = async (query) => InvoiceServices.findAll({
  where: { servicename: { [Op.like]: \`%\${query}%\` } }
});`,

  'controllers/invoiceService.controller.js': `import * as invoiceServiceService from '../services/invoiceService.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import messages from '../constants/messages.js';

export const createService = asyncHandler(async (req, res) => {
  await invoiceServiceService.createService(req.body);
  return res.success(undefined, messages.CREATED, 201);
});
export const getServices = asyncHandler(async (req, res) => {
  const services = await invoiceServiceService.getAllServices();
  return res.success(services, messages.FETCHED, 200);
});
export const getService = asyncHandler(async (req, res) => {
  const service = await invoiceServiceService.getServiceById(req.params.id);
  return res.success(service, messages.FETCHED, 200);
});
export const updateService = asyncHandler(async (req, res) => {
  await invoiceServiceService.updateService(req.params.id, req.body);
  return res.success(undefined, messages.UPDATED, 200);
});
export const deleteService = asyncHandler(async (req, res) => {
  await invoiceServiceService.deleteService(req.params.id);
  return res.success(undefined, messages.DELETED, 200);
});
export const searchServices = asyncHandler(async (req, res) => {
  const query = req.query.q || req.body.q;
  const services = await invoiceServiceService.searchServices(query);
  return res.success(services, messages.FETCHED, 200);
});`,

  'routes/invoiceService.routes.js': `import express from 'express';
import * as invoiceServiceController from '../controllers/invoiceService.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/get-all', invoiceServiceController.getServices);
router.post('/get/:id', invoiceServiceController.getService);
router.post('/search', invoiceServiceController.searchServices);
router.use(protect);
router.post('/create', invoiceServiceController.createService);
router.post('/update/:id', invoiceServiceController.updateService);
router.post('/delete/:id', invoiceServiceController.deleteService);
export default router;`
};

for (const [relativePath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(baseDir, relativePath), content);
}

// Modify index.js to include the new routes
const indexPath = path.join(baseDir, 'routes/index.js');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('invoiceProductRoutes')) {
  // Add imports
  indexContent = indexContent.replace(
    "import reportRoutes from './report.routes.js';",
    "import reportRoutes from './report.routes.js';\nimport invoiceProductRoutes from './invoiceProduct.routes.js';\nimport invoiceServiceRoutes from './invoiceService.routes.js';"
  );
  // Add uses
  indexContent = indexContent.replace(
    "router.use('/reports', reportRoutes);",
    "router.use('/reports', reportRoutes);\nrouter.use('/invoice-products', invoiceProductRoutes);\nrouter.use('/invoice-services', invoiceServiceRoutes);"
  );
  fs.writeFileSync(indexPath, indexContent);
}

console.log("Backend APIs generated successfully.");
