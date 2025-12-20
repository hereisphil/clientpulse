import cors from "cors";
import "dotenv/config";
import express, { type Request, type Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "passport";
import routeHandler from "./app/routes/index.ts";
import passportService from "./app/services/passport.ts";

const app = express();
const PORT = Number(process.env.PORT) || 8001;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passportService();

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is running.",
  });
});

app.use("/api/v1", routeHandler);

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    const conn = await mongoose.connect(uri);
    console.log(`Connected to MongoDB successfully ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
