import cors from "cors";
import express, { type Response } from "express";
import morgan from "morgan";
import routeHandler from "./routes/index.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is running.",
  });
});

app.use("/api/v1", routeHandler);

export default app;
