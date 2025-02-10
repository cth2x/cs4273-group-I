import mysql from 'mysql2';

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST, // Database host, could be AWS RDS, etc.
  user: process.env.MYSQL_USER, // Username for the database
  password: process.env.MYSQL_PASSWORD, // Password for the database
  database: process.env.MYSQL_DATABASE, // Database name
});

export default connection;