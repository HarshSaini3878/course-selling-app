import express from "express";
import dotenv from 'dotenv';
import chalk from "chalk";
import dbconnect from "./Utils/db.js";
const app=express();
dotenv.config();
dbconnect();
import { userRouter } from "./routes/user.routes.js";
import { courseRouter } from "./routes/course.routes.js";
import { adminRouter } from "./routes/admin.routes.js";
app.use("api/v1/user",userRouter);
app.use("api/v1/course",courseRouter);
app.use("api/v1/admin",adminRouter);
const port = process.env.PORT || 3000; 

app.listen(port, () => {
    console.log(chalk.blue(`Server is running on port ${port}`));
});