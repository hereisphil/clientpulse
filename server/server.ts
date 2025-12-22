import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const PORT = Number(process.env.PORT) || 8001;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined");
  await mongoose.connect(uri);
};

await connectDB();
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
