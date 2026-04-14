import mongoose from "mongoose";
import pg from "pg";

const { Pool } = pg;

export const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export const pool = new Pool({
  host: "localhost",
  port: 5433,
  user: "postgres",
  password: "postgres",
  database: "sql_class_2_db",
});