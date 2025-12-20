import bcrypt from "bcryptjs";
import { Schema, model, type Model } from "mongoose";

type User = {
  email: string;
  password: string | null;
};

type UserMethods = {
  comparePassword(candidatePassword: string): Promise<boolean>;
};

// Model type that includes methods
type UserModel = Model<User, {}, UserMethods>;

const userSchema = new Schema<User, {}, UserMethods>(
  {
    email: {
      type: String,
      unique: [true, "User with email already exists."],
      lowercase: true,
      trim: true,
      required: [true, "User email is required"],
      match: [
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Email must match this format: user@email.com",
      ],
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const user = this;

  if (!user.isNew && !user.isModified("password")) return;
  if (!user.password) return;

  const salt = await new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return reject(error);
      if (!salt) return reject(new Error("bcrypt salt was undefined"));
      resolve(salt);
    });
  });

  const hash = await new Promise<string>((resolve, reject) => {
    bcrypt.hash(user.password as string, salt, (error, hash) => {
      if (error) reject(error);
      else resolve(hash!);
    });
  });

  user.password = hash;
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
  const user = this;

  return new Promise<boolean>((resolve, reject) => {
    // if password missing for any reason, fail safely
    if (!user.password) return resolve(false);

    bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
      if (error) return reject(error);
      resolve(Boolean(isMatch));
    });
  });
};

const UserModel = model<User, UserModel>("User", userSchema);
export default UserModel;
