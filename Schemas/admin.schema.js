const{Schema,default:mongoose}=require("mongoose");
const AdminSchema=new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    admin_id: { type: Schema.Types.ObjectId } 
})
const AdminModel=mongoose.model("Admin",AdminSchema);
module.exports=AdminModel;