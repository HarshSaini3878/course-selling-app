const { Schema, default: mongoose } = require("mongoose");
const UserModel = require("./user.schema");

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: "User" },  
    course_Id: { type: Schema.Types.ObjectId },
    image_URL: { type: String }
});

const CourseModel = mongoose.model("Course", courseSchema);
module.exports = CourseModel;
