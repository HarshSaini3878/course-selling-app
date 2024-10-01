import { Router } from 'express';
const userRouter = Router();

userRouter.post('/signin', (req, res) => {
    // Handle sign-in logic here
    res.send("Sign-in route");
});

export { userRouter };
