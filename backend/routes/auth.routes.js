import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/database.js";
const JWT_SECRET = "intern_learning_secret";

const router = express.Router();
/* Register */
router.post("/register", async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      name,
      email,
      hashedPassword
    );

    res.json({ success: true });
  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(400).json({ message: err.message });
  }
});


/* Login */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.get(
    "SELECT * FROM users WHERE email = ?",
    email
  );

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1d" });

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

export default router;