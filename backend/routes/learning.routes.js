import express from "express";
import db from "../db/database.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

/* GET user learning */
router.get("/", authMiddleware, async (req, res) => {
  const rows = await db.all(
    "SELECT * FROM learning WHERE userId = ? ORDER BY id DESC",
    req.user.id
  );
  res.json(rows);
});

/* GET by ID */
router.get("/:id", authMiddleware, async (req, res) => {
  const row = await db.get(
    "SELECT * FROM learning WHERE id = ? AND userId = ?",
    req.params.id,
    req.user.id
  );

  if (!row) return res.status(404).json({ message: "Not found" });
  res.json(row);
});

/* CREATE */
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

/* UPDATE */
router.put("/:id", authMiddleware, async (req, res) => {
  const { date, session, topic, description, timeSpent } = req.body;

  await db.run(
    `UPDATE learning
     SET date=?, session=?, topic=?, description=?, timeSpent=?
     WHERE id=? AND userId=?`,
    date,
    session,
    topic,
    description,
    timeSpent,
    req.params.id,
    req.user.id
  );

  res.json({ success: true });
});

/* DELETE */
router.delete("/:id", authMiddleware, async (req, res) => {
  await db.run(
    "DELETE FROM learning WHERE id=? AND userId=?",
    req.params.id,
    req.user.id
  );

  res.json({ success: true });
});

export default router;
