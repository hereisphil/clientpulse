import type { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";
import app from "../app.ts";

let cached = (global as any).mongooseConn as typeof mongoose | null;

async function connectDB() {
  if (cached) return cached;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined");

  cached = await mongoose.connect(uri);
  (global as any).mongooseConn = cached;
  return cached;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();
  return app(req as any, res as any);
}
