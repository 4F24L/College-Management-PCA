import express from 'express';
import * as controller from '../controllers/facultiesController.js';

const router = express.Router();

router.get('/', controller.listFaculties);
router.get('/:id', controller.getFaculty);
router.post('/', controller.createFaculty);
router.put('/:id', controller.updateFaculty);
router.delete('/:id', controller.deleteFaculty);

export default router;
