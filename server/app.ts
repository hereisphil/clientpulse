import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import passport from "passport";

import routeHandler from "./app/routes/index.js";
import passportService from "./app/services/passport.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(passport.initialize());
passportService();

app.get("/", (_req, res) => {
  res.status(200).json({ success: true, message: "API is running." });
});

app.use("/api/v1", routeHandler);

export default app;
