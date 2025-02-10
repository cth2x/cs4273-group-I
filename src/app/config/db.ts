import mysql from "mysql2/promise"
import dotenv from "dotenv"


dotenv.config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,        // e.g., "db" (if using Docker)
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,        // e.g., "root"
  password: process.env.DB_PASSWORD, // e.g., "testing"
  database: process.env.DB_NAME,    // e.g., "mydatabase"
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;