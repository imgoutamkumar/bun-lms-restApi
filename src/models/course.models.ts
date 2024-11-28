import { createDb } from "../db/db";
const db = createDb();

export const AllCourses = () => {
  return db.query("SELECT * FROM courses").all();
};

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
