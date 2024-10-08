import mongoose, { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId } 
});

const UserModel = model("User", UserSchema);

export default UserModel;
