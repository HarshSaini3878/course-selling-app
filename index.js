const express=require(express);
const app=express();
const {userRouter}=require("./users");
const {courseRouter}=require("./course");
app.use("api/v1/user",userRouter);
app.use("api/v1/course",courseRouter);
app.listen(3000);