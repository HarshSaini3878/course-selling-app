import { Router } from 'express';
import { isSignin } from '../middlewares/auth.middleware.js';
import { createCourse, getcourses, updateCourse } from '../controllers/admin.controllers.js';
const adminRouter = Router();

adminRouter.post('/create', isSignin, createCourse);
adminRouter.put('/update', isSignin, updateCourse);
adminRouter.get('/getCourses', isSignin, getcourses);

export { adminRouter };
