import { Router } from 'express';
import { purchaseCourse, signin, signup } from '../controllers/auth.controller.js';
import { isSignin } from '../middlewares/auth.middleware.js';
import { getCourse } from '../controllers/admin.controllers.js';
const userRouter = Router();

userRouter.post('/signin', signin);
userRouter.post('/signup', signup);
userRouter.get('/purchase',isSignin ,purchaseCourse);
userRouter.get('/course',isSignin ,getCourse);


export { userRouter };
