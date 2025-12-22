import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.get("/", (_req, res) =>
  res.status(200).json({ success: true, message: "API is running." })
);

import routeHandler from "./app/routes/index.js";
app.use("/api/v1", routeHandler);

import passport from "passport";
import passportService from "./app/services/passport.js";

app.use(passport.initialize());
passportService();

export default app;
