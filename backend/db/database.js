import sqlite3 from "sqlite3";
import { open } from "sqlite";

/* Open database */
const db = await open({
  filename: "learning.db",
  driver: sqlite3.Database
});

/* Create learning table */
await db.exec(`
  CREATE TABLE IF NOT EXISTS learning (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    session TEXT NOT NULL,
    topic TEXT NOT NULL,
    description TEXT NOT NULL,
    timeSpent REAL NOT NULL,
    createdAt TEXT NOT NULL
  )
`);

/* Create users table */
await db.exec(`
  CREATE TABLE IF NOT EXISTS learning (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    date TEXT NOT NULL,
    session TEXT NOT NULL,
    topic TEXT NOT NULL,
    description TEXT NOT NULL,
    timeSpent REAL NOT NULL,
    createdAt TEXT NOT NULL
  )
`);


export default db;

