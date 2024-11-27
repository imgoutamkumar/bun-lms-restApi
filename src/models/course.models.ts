import { createDb } from "../db/db";
const db = createDb();

db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      level TEXT NOT NULL
    )
  `);

export default db;

/* export const Course = {
  create: (
    title: string,
    description: string,
    price: number,
    level: string
  ) => {
    return db.run(
      "INSERT INTO courses (title, description, price, level) VALUES (?, ?, ?, ?)",
      title,
      description,
      price,
      level
    );
  },
  findAll: () => db.query("SELECT * FROM courses").all(),
  findById: (id: number) =>
    db.query("SELECT * FROM courses WHERE id = ?").get(id),
  update: (
    id: number,
    title: string,
    description: string,
    price: number,
    level: string
  ) => {
    return db.run(
      "UPDATE courses SET title = ?, description = ?, price = ?, level = ? WHERE id = ?",
      title,
      description,
      price,
      level,
      id
    );
  },
  delete: (id: number) => db.run("DELETE FROM courses WHERE id = ?", id),
}; */
