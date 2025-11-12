import express from 'express';
import * as controller from '../controllers/staffsController.js';

const router = express.Router();

router.get('/', controller.listStaffs);
router.get('/:id', controller.getStaff);
router.post('/', controller.createStaff);
router.put('/:id', controller.updateStaff);
router.delete('/:id', controller.deleteStaff);

export default router;
