import type { RequestHandler } from "express";
import passport from "passport";

// Uses the JWT strategy registered in passportService()
export const requireAuth: RequestHandler = passport.authenticate("jwt", {
  session: false,
});
