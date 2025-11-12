import express from 'express';
import * as controller from '../controllers/departmentsController.js';

const router = express.Router();

router.get('/', controller.listDepartments);

export default router;
