import type { NextFunction, Request, Response } from "express";
import jwt from "jwt-simple";
import config from "../../config.ts";
import User from "../models/User.ts";

const tokenForUser = (user: { _id: string }) => {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user._id,
      iat: timestamp,
    },
    config.secret
  );
};

export const signin = (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "Not authorized" });
  }

  return res.status(200).json({
    user_id: user._id,
    token: tokenForUser({ _id: user._id }),
  });
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "Please provide your email and password" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ error: "Email already in use" });
    }

    const user = new User({ email, password });
    await user.save();

    return res.json({
      user_id: user._id,
      token: tokenForUser({ _id: user._id.toString() }),
    });
  } catch (error) {
    return next(error);
  }
};
