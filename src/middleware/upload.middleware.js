import multer from 'multer';
import { AppError } from '../utils/apiResponse.js';

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

export const uploadProductImages = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'images', maxCount: 4 }
]);

export const uploadGalleryImage = upload.single('image');

export const uploadServiceImage = upload.single('image');
