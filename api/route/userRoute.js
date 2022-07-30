import express from 'express'
import { allUser, createUser, deleteUser, singleUser, updateUser, userLogin } from '../controllers/userController.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddlewares.js';
import { userhMiddleware } from '../middlewares/userMiddleware.js';
const router = express.Router();

// students route manage
router.route('/').get( authMiddleware, allUser).post(authMiddleware, createUser)
router.route('/:id').get(adminMiddleware, singleUser).patch(userhMiddleware, updateUser).put( adminMiddleware,updateUser).delete(adminMiddleware, deleteUser)

router.route('/login').post(userLogin);
router.route('/register').post(createUser);

export default router