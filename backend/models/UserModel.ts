import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 100},
    last_name: {type: String, required: true, maxLength: 100},
    email: {type: String, required: true},
    password: {type: String, required: true},
    birth_date: {type: Date, required: true},
    genre: {type: String, required: true},
    createdAt: {
        type: Date,
        default: new Date()
    }
});


const UserModel = mongoose.model("User", UserSchema)

export default UserModel;