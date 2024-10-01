const{Schema, default: mongoose}=require("mongoose");
const UserModel=require("./user.schema");
const CourseModel=require("./course.schema");
const PurchaseSchema=new Schema({
   purchase_id:Schema.Types.ObjectId,
   course_id:{type:Schema.Types.ObjectId,ref:"Course"},
   user_id:{type:Schema.Types.ObjectId,ref:"User"}
})
const PurchaseModel=mongoose.model("Purchase",PurchaseSchema);
module.exports=PurchaseModel;