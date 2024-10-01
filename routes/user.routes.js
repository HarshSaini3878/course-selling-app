import { Router } from 'express';
import { signin, signup } from '../controllers/auth.controller.js';
const userRouter = Router();

userRouter.post('/signin', signin);
userRouter.post('/signup', signup);

export { userRouter };
