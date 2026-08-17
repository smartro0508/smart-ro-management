import * as galleryService from '../services/gallery.service.js';
import asyncHandler from '../utils/asyncHandler.js';

export const addImage = asyncHandler(async (req, res) => {
  if (!req.body.image) {
    return res.error('Image is required', 400);
  }
  const gallery = await galleryService.addImage({ image: req.body.image });
  return res.success(gallery, 'Image added successfully', 201);
});

export const getImages = asyncHandler(async (req, res) => {
  const images = await galleryService.getAllImages();
  return res.success(images, 'Gallery fetched successfully', 200);
});

export const deleteImage = asyncHandler(async (req, res) => {
  await galleryService.deleteImage(req.params.id);
  return res.success(undefined, 'Image deleted successfully', 200);
});
