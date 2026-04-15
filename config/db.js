import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "vg@123",
  database: "sql_class_2_db",
});