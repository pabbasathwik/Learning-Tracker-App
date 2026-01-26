import sqlite3 from "sqlite3";
import { open } from "sqlite";

/* Open database */
const db = await open({
  filename: "learning.db",
  driver: sqlite3.Database
});

/* USERS table (Auth) */
await db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'intern',
    createdAt TEXT NOT NULL
  )
`);

/* LEARNING table (User-based learning) */
await db.exec(`
  CREATE TABLE IF NOT EXISTS learning (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    date TEXT NOT NULL,
    session TEXT NOT NULL,
    topic TEXT NOT NULL,
    description TEXT NOT NULL,
    timeSpent REAL NOT NULL,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
  )
`);

export default db;

