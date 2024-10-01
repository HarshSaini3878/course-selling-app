import mongoose, { Schema } from 'mongoose';
import UserModel from './user.schema.js';

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: "User" },
    course_Id: { type: Schema.Types.ObjectId },
    image_URL: { type: String }
});

const CourseModel = mongoose.model("Course", courseSchema);
export default CourseModel;
