import express from 'express';
import * as controller from '../controllers/studentsController.js';

const router = express.Router();

router.get('/', controller.listStudents);
router.get('/:id', controller.getStudent);
router.post('/', controller.createStudent);
router.put('/:id', controller.updateStudent);
router.delete('/:id', controller.deleteStudent);

export default router;
