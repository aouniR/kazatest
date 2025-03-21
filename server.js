const app = require('./index')
require('dotenv').config()
const { Pool } = require("pg")

const pool = new Pool({
    connectionString: process.env.db_url,
    ssl: false, 
  })

pool.on("connect", () => {
    console.log("✅ Connected to PostgreSQL")
  })

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(20) UNIQUE NOT NULL,
      fullname VARCHAR(20) NOT NULL,
      password JSONB NOT NULL,
      joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
pool.query(createTableQuery)
  .then(() => console.log("✅ Db is intialized"))
  .catch((err) => console.error("❌ Error creating users table:", err));

app.listen(process.env.port,()=>{
    console.log(`⚡️ Server is running on http://${process.env.server}:${process.env.port}`)
})
