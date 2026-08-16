import express from 'express';
import * as settingController from '../controllers/setting.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(protect);
router.post('/get', settingController.getSettings);
router.post('/update', settingController.updateSettings);

export default router;
