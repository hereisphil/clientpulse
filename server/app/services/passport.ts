import passport from "passport";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  type VerifiedCallback,
} from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import config from "../../config.ts";
import UserModel from "../models/User.ts";

type JwtPayload = {
  sub: string;
  iat: number;
};

const localOptions = {
  usernameField: "email",
};

// Local strategy (email + password)
const localStrategy = new LocalStrategy(
  localOptions,
  async (email: string, password: string, done: VerifiedCallback) => {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) return done(null, false);

      const matched = await user.comparePassword(password);
      if (!matched) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
);

// JWT strategy
const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new JwtStrategy(
  jwtOptions,
  async (payload: JwtPayload, done: VerifiedCallback) => {
    try {
      const user = await UserModel.findById(payload.sub);
      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }
);

export default function passportService() {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
}
