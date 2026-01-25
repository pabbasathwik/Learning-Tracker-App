import express from "express";
import db from "../db/database.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

/* GET all learning */
router.get("/", async (req, res) => {
  const rows = await db.all(
    "SELECT * FROM learning ORDER BY id DESC"
  );
  res.json(rows);
});

/* GET by ID */
router.get("/:id", async (req, res) => {
  const row = await db.get(
    "SELECT * FROM learning WHERE id = ?",
    req.params.id
  );

  if (!row) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(row);
});

/* CREATE */
router.post("/", async (req, res) => {
  const { date, session, topic, description, timeSpent } = req.body;

  const result = await db.run(
    `INSERT INTO learning 
     (date, session, topic, description, timeSpent, createdAt)
     VALUES (?, ?, ?, ?, ?, ?)`,
    date,
    session,
    topic,
    description,
    timeSpent,
    new Date().toISOString()
  );

  res.json({ id: result.lastID });
});

/* UPDATE */
router.put("/:id", async (req, res) => {
  const { date, session, topic, description, timeSpent } = req.body;

  await db.run(
    `UPDATE learning
     SET date = ?, session = ?, topic = ?, description = ?, timeSpent = ?
     WHERE id = ?`,
    date,
    session,
    topic,
    description,
    timeSpent,
    req.params.id
  );

  res.json({ success: true });
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await db.run(
    "DELETE FROM learning WHERE id = ?",
    req.params.id
  );

  res.json({ success: true });
});

/* GET user learning */
router.get("/", authMiddleware, async (req, res) => {
  const rows = await db.all(
    "SELECT * FROM learning WHERE userId = ? ORDER BY id DESC",
    req.user.id
  );
  res.json(rows);
});

/* CREATE learning */
router.post("/", authMiddleware, async (req, res) => {
  const { date, session, topic, description, timeSpent } = req.body;

  await db.run(
    `INSERT INTO learning
     (userId, date, session, topic, description, timeSpent, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    req.user.id,
    date,
    session,
    topic,
    description,
    timeSpent,
    new Date().toISOString()
  );

  res.json({ success: true });
});

export default router;
