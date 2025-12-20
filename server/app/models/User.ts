import bcrypt from "bcrypt-nodejs";
import { Schema, model, type HydratedDocument } from "mongoose";

type User = {
  email: string;
  password: string | null;
};

type UserMethods = {
  comparePassword(candidatePassword: string): Promise<boolean>;
};

type UserDoc = HydratedDocument<User, UserMethods>;

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
  const user = this as UserDoc;

  if (!user.isNew && !user.isModified("password")) return;
  if (!user.password) return; // safety: nothing to hash

  const salt = await new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(10, (error: Error | null, salt: string) => {
      if (error) reject(error);
      else resolve(salt);
    });
  });

  const hash = await new Promise<string>((resolve, reject) => {
    bcrypt.hash(
      user.password as string,
      salt,
      null,
      (error: Error | null, hash: string) => {
        if (error) reject(error);
        else resolve(hash);
      }
    );
  });

  user.password = hash;
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
  const user = this as UserDoc;

  return new Promise<boolean>((resolve, reject) => {
    // if password missing for any reason, fail safely
    if (!user.password) return resolve(false);

    bcrypt.compare(
      candidatePassword,
      user.password,
      (error: Error | null, isMatch: boolean) => {
        if (error) return reject(error);
        resolve(isMatch);
      }
    );
  });
};

const UserModel = model("User", userSchema);
export default UserModel;
