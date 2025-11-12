import express from 'express';
import * as controller from '../controllers/marksController.js';

const router = express.Router();

router.get('/', controller.listMarks);
router.get('/:id', controller.getMark);
router.post('/', controller.createMark);
router.put('/:id', controller.updateMark);
router.delete('/:id', controller.deleteMark);

export default router;
