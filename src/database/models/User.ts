import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    minLength: 8,
  },
  avatar: String,
});

const User = model("User", userSchema, "users");

export default User;
