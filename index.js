const express=require(express);
const app=express();
const {userRouter}=require("./routes/user.routes");
const {courseRouter}=require("./routes/course.routes");
const {adminRouter}=require("./routes/admin.routes");
app.use("api/v1/user",userRouter);
app.use("api/v1/course",courseRouter);
app.use("api/v1/admin",adminRouter);
app.listen(3000);