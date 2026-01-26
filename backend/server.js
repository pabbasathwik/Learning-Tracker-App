import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import learningRoutes from "./routes/learning.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/learning", learningRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

