import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import passport from "passport";
import routeHandler from "./app/routes/index.ts";
import passportService from "./app/services/passport.ts";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://clientpulse-frontend.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);

app.options(/.*/, cors());

app.use(passport.initialize());
passportService();

app.get("/", (_req, res) =>
  res.status(200).json({ success: true, message: "API is running." })
);
app.use("/api/v1", routeHandler);

export default app;
