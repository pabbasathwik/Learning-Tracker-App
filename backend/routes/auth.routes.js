import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db/database.js";

const router = express.Router();
const JWT_SECRET = "intern_learning_secret";

/* REGISTER */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const hashed = await bcrypt.hash(password, 10);

    await pool.request()
      .input("name", name)
      .input("email", email)
      .input("password", hashed)
      .query(`
        INSERT INTO users (name, email, password)
        VALUES (@name, @email, @password)
      `);

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.request()
    .input("email", email)
    .query("SELECT * FROM users WHERE email=@email");

  const user = result.recordset[0];
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

export default router;
