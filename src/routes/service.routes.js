import express from 'express';
import * as serviceController from '../controllers/service.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadServiceImage } from '../middleware/upload.middleware.js';
import { resizeServiceImage } from '../middleware/imageResize.middleware.js';

const router = express.Router();

router.post('/get-all', serviceController.getServices);
router.post('/get/:id', serviceController.getService);
router.post('/search', serviceController.searchServices);

router.use(protect);

router.post(
  '/create',
  uploadServiceImage,
  resizeServiceImage,
  serviceController.createService
);

router.post(
  '/update/:id',
  uploadServiceImage,
  resizeServiceImage,
  serviceController.updateService
);

router.post('/delete/:id', serviceController.deleteService);

export default router;
