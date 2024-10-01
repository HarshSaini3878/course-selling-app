const express=require(express);
require('dotenv').config();
const dbconnect=require("./Utils/db")
const app=express();
dbconnect();
const {userRouter}=require("./routes/user.routes");
const {courseRouter}=require("./routes/course.routes");
const {adminRouter}=require("./routes/admin.routes");
app.use("api/v1/user",userRouter);
app.use("api/v1/course",courseRouter);
app.use("api/v1/admin",adminRouter);
const port = process.env.PORT || 3000; 

app.listen(port, () => {
    console.log(chalk.blue(`Server is running on port ${port}`));
});