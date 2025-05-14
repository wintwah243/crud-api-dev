import express from 'express';
import * as studentController from '../controller/studentController';

const router = express.Router();

router.get('/student', studentController.getAllStudent);
router.get('/student/:id', studentController.getStudent);
router.post('/student', studentController.addStudent);
router.put('/student/:id', studentController.updateStudent);
router.delete('/student/:id', studentController.deleteStudent);

export default router;