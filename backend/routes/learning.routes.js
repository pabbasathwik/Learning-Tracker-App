import express from "express";
import { pool } from "../db/database.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

/* GET */
router.get("/", authMiddleware, async (req, res) => {
  const result = await pool.request()
    .input("userId", req.user.id)
    .query(`
      SELECT * FROM learning
      WHERE userId=@userId
      ORDER BY id DESC
    `);

  res.json(result.recordset);
});

/* CREATE */
router.post("/", authMiddleware, async (req, res) => {
  const { date, session, topic, description, timeSpent } = req.body;

  await pool.request()
    .input("userId", req.user.id)
    .input("date", date)
    .input("session", session)
    .input("topic", topic)
    .input("description", description)
    .input("timeSpent", timeSpent)
    .input("createdAt", new Date().toISOString())
    .query(`
      INSERT INTO learning
      (userId, date, session, topic, description, timeSpent, createdAt)
      VALUES
      (@userId, @date, @session, @topic, @description, @timeSpent, @createdAt)
    `);

  res.json({ success: true });
});

/* UPDATE */
router.put("/:id", authMiddleware, async (req, res) => {
  const { date, session, topic, description, timeSpent } = req.body;

  await pool.request()
    .input("id", req.params.id)
    .input("userId", req.user.id)
    .input("date", date)
    .input("session", session)
    .input("topic", topic)
    .input("description", description)
    .input("timeSpent", timeSpent)
    .query(`
      UPDATE learning
      SET
        date = @date,
        session = @session,
        topic = @topic,
        description = @description,
        timeSpent = @timeSpent
      WHERE id = @id AND userId = @userId
    `);

  res.json({ success: true });
});


/* DELETE */
router.delete("/:id", authMiddleware, async (req, res) => {
  await pool.request()
    .input("id", req.params.id)
    .input("userId", req.user.id)
    .query(`
      DELETE FROM learning
      WHERE id=@id AND userId=@userId
    `);

  res.json({ success: true });
});

export default router;
