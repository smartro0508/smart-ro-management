import express from 'express';
import * as galleryController from '../controllers/gallery.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadGalleryImage } from '../middleware/upload.middleware.js';
import { resizeGalleryImage } from '../middleware/imageResize.middleware.js';

const router = express.Router();

router.post('/get-all', galleryController.getImages);

router.use(protect);

router.post(
  '/add',
  uploadGalleryImage,
  resizeGalleryImage,
  galleryController.addImage
);

router.post('/delete/:id', galleryController.deleteImage);

export default router;
