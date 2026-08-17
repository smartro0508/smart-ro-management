import sharp from 'sharp';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import asyncHandler from '../utils/asyncHandler.js';

export const resizeProductImages = asyncHandler(async (req, res, next) => {
  if (!req.files) return next();

  const uploadDir = path.join(process.cwd(), 'uploads', 'images');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // 1) Cover image (mainImage)
  if (req.files.mainImage) {
    req.body.mainImage = `product-${crypto.randomUUID()}-${Date.now()}-main.jpeg`;

    await sharp(req.files.mainImage[0].buffer)
      .resize(800, 800, { fit: 'inside' })
      .toFormat('jpeg')
      .jpeg({ quality: 80 })
      .toFile(`uploads/images/${req.body.mainImage}`);
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
          .toFile(`uploads/images/${filename}`);

        newImages.push(filename);
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
});

export const resizeGalleryImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  const uploadDir = path.join(process.cwd(), 'uploads', 'images');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  req.body.image = `gallery-${crypto.randomUUID()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(1000, 1000, { fit: 'inside' })
    .toFormat('jpeg')
    .jpeg({ quality: 85 })
    .toFile(`uploads/images/${req.body.image}`);

  next();
});
