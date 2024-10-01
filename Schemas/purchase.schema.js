import mongoose, { Schema } from 'mongoose';
import UserModel from './user.schema.js';
import CourseModel from './course.schema.js';

const PurchaseSchema = new Schema({
   purchase_id: Schema.Types.ObjectId,
   course_id: { type: Schema.Types.ObjectId, ref: "Course" },
   user_id: { type: Schema.Types.ObjectId, ref: "User" }
});

const PurchaseModel = mongoose.model("Purchase", PurchaseSchema);
export default PurchaseModel;
