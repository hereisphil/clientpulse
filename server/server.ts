import cors from "cors";
import "dotenv/config";
import express, { type Request, type Response } from "express";
import morgan from "morgan";
import connectDB from "./app/db/config.js";
import routeHandler from "./app/routes/index.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is running.",
  });
});

app.use("/api/v1", routeHandler);

connectDB();

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
