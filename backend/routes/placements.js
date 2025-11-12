import express from 'express';
import * as controller from '../controllers/placementsController.js';

const router = express.Router();

router.get('/', controller.listPlacements);
router.get('/:id', controller.getPlacement);
router.post('/', controller.createPlacement);
router.put('/:id', controller.updatePlacement);
router.delete('/:id', controller.deletePlacement);

export default router;
