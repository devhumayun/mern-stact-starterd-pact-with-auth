import express from 'express'
const router = express.Router();
import { allStudents, createStudent, deleteStudent, singleStudent, studentLogin, updateStudent } from '../controllers/studetnsController.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddlewares.js';
import { userhMiddleware } from '../middlewares/userMiddleware.js';


// students route manage
router.route('/').get( authMiddleware, allStudents).post(createStudent)
router.route('/:id').get(adminMiddleware, singleStudent).patch(userhMiddleware, updateStudent).put(userhMiddleware, updateStudent).delete(userhMiddleware, deleteStudent)

router.route('/login').post(studentLogin);
router.route('/register').post(createStudent);

export default router