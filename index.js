const express=require(express);
const app=express();
const {userRouter}=require("./users");
app.use("api/v1/user",userRouter);
app.listen(3000);