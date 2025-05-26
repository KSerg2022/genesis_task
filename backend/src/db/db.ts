import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  user: process.env.PGUSER || "root",
  password: process.env.PGPASSWORD || "genesis",
  host: process.env.PGHOST || "postgres",
  port: parseInt(process.env.PGPORT || "5432"),
  database: process.env.PGDATABASE || "genesisdb"
});

// console.log("Connecting to PostgreSQL at", pool);
export default pool;
