import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { connectDB } from "./config/dbConnect.js";
import "dotenv/config";
import job from "./config/cron.js";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.disable("x-powered-by");
app.use(cors());
app.use(express.json({ limit: "12mb" }));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "BookWorm API is running",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    service: "bookworm-api",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`BookWorm API running on port ${PORT}`);
  });

  if (process.env.API_URL) {
    job.start();
  }
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});