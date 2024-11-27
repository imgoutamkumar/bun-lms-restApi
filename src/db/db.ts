import { migrate, getMigrations } from "bun-sqlite-migrations";
import Database from "bun:sqlite";

export const createDb = () => {
  const db = new Database("siksha-lms.db");
  migrate(db, getMigrations("./migrations"));
  return db;
};
