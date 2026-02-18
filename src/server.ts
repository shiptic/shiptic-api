import "dotenv/config";
import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Basic test route
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Start server
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


// FedEx Auth Test
import { getToken } from "./services/fedex/auth";
app.get("/fedex-auth-test", async (_req, res) => {
  try {
    const token = await getToken();

    res.json({
      success: true,
      tokenPreview: token,
    });
  } catch (error: any) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
