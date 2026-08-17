import sharp from 'sharp';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import asyncHandler from '../utils/asyncHandler.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const resizeProductImages = asyncHandler(async (req, res, next) => {
  if (!req.files) return next();

  const uploadDir = path.join(__dirname, '../../uploads/images');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const processedImages = [];
  try {
    // 1) Cover image (mainImage)
    if (req.files.mainImage) {
      req.body.mainImage = `product-${crypto.randomUUID()}-${Date.now()}-main.jpeg`;

      await sharp(req.files.mainImage[0].buffer)
        .resize(800, 800, { fit: 'inside' })
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toFile(path.join(uploadDir, req.body.mainImage));
        
      processedImages.push(req.body.mainImage);
    }

    // 2) Images (images array)
    if (req.files.images) {
      const newImages = [];

      await Promise.all(
        req.files.images.map(async (file, i) => {
          const filename = `product-${crypto.randomUUID()}-${Date.now()}-${i + 1}.jpeg`;

          await sharp(file.buffer)
            .resize(800, 800, { fit: 'inside' })
            .toFormat('jpeg')
            .jpeg({ quality: 80 })
            .toFile(path.join(uploadDir, filename));

          newImages.push(filename);
          processedImages.push(filename);
        })
      );

      // If there were existing image strings passed along
      if (Array.isArray(req.body.images)) {
        req.body.images = [...req.body.images, ...newImages];
      } else {
        req.body.images = newImages;
      }
    }

    next();
  } catch (error) {
    processedImages.forEach(img => {
      const imgPath = path.join(uploadDir, img);
      if (fs.existsSync(imgPath)) {
        try { fs.unlinkSync(imgPath); } catch (err) {}
      }
    });
    throw error;
  }
});

export const resizeGalleryImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  const uploadDir = path.join(__dirname, '../../uploads/images');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  req.body.image = `gallery-${crypto.randomUUID()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(1000, 1000, { fit: 'inside' })
    .toFormat('jpeg')
    .jpeg({ quality: 85 })
    .toFile(path.join(uploadDir, req.body.image));

  next();
});
