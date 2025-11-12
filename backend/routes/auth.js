import express from 'express';
import * as controller from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', controller.signup);
router.post('/signin', controller.signin);
router.get('/me', controller.me);

export default router;
