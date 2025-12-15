import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "User email is required"],
      unique: [true, "User with email already exists."],
      trim: true,
      lowercase: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Email must match this format: user@email.com",
      ],
    },
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);
export default UserModel;
