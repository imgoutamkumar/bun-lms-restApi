import { createDb } from "../db/db";
const db = createDb();

db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      gmail TEXT,
      mobile_no INTEGER NOT NULL,
    )
  `);

export default db;
